/**
 * @copyright Copyright (c) 2023 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
import type { ContentsWithRoot } from '@nextcloud/files'
import type { FileStat, ResponseDataDetailed } from 'webdav'
import type { TagWithId } from '../types'

import { getCurrentUser } from '@nextcloud/auth'
import { Folder, Permission, getDavNameSpaces, getDavProperties, davGetClient, davResultToNode, davRemoteURL, davRootPath } from '@nextcloud/files'
import { fetchTags } from './api'

const rootPath = '/systemtags'

const client = davGetClient()
const resultToNode = (node: FileStat) => davResultToNode(node)

const formatReportPayload = (tagId: number) => `<?xml version="1.0"?>
<oc:filter-files ${getDavNameSpaces()}>
	<d:prop>
		${getDavProperties()}
	</d:prop>
	<oc:filter-rules>
		<oc:systemtag>${tagId}</oc:systemtag>
	</oc:filter-rules>
</oc:filter-files>`

const tagToNode = function(tag: TagWithId): Folder {
	return new Folder({
		id: tag.id,
		source: `${davRemoteURL}${rootPath}/${tag.id}`,
		owner: String(getCurrentUser()?.uid ?? 'anonymous'),
		root: rootPath,
		displayname: tag.displayName,
		permissions: Permission.READ,
		attributes: {
			...tag,
			'is-tag': true,
		},
	})
}

export const getContents = async (path = '/'): Promise<ContentsWithRoot> => {
	// List tags in the root
	const tagsCache = (await fetchTags()).filter(tag => tag.userVisible) as TagWithId[]

	if (path === '/') {
		return {
			folder: new Folder({
				id: 0,
				source: `${davRemoteURL}${rootPath}`,
				owner: getCurrentUser()?.uid as string,
				root: rootPath,
				permissions: Permission.NONE,
			}),
			contents: tagsCache.map(tagToNode),
		}
	}

	const tagId = parseInt(path.split('/', 2)[1])
	const tag = tagsCache.find(tag => tag.id === tagId)

	if (!tag) {
		throw new Error('Tag not found')
	}

	const folder = tagToNode(tag)
	const contentsResponse = await client.getDirectoryContents(davRootPath, {
		details: true,
		// Only filter favorites if we're at the root
		data: formatReportPayload(tagId),
		headers: {
			// Patched in WebdavClient.ts
			method: 'REPORT',
		},
	}) as ResponseDataDetailed<FileStat[]>

	return {
		folder,
		contents: contentsResponse.data.map(resultToNode),
	}

}
