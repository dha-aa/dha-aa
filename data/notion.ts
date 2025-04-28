import { CardProps } from '@/lib/types'
import { Client } from '@notionhq/client'
import { config } from 'dotenv'

config()

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseIdProjects = process.env.NOTION_DATABASE_ID
const databaseIdProfile = process.env.NOTION_DATABASE_ID_O

async function fetchAndFormatEntries() {
  let results = []
  let hasMore = true
  let startCursor = undefined

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseIdProjects,
      start_cursor: startCursor,
    })

    results = results.concat(response.results)
    hasMore = response.has_more
    startCursor = response.next_cursor
  }

  const groupedData = {}

  results.forEach((page) => {
    const properties = page.properties
    const category = properties.Catogary?.select?.name || 'Uncategorized'
    const name = properties.title?.title[0]?.plain_text || 'No Name'
    const description = properties.discripation?.rich_text[0]?.plain_text || 'No Description'
    const icon = properties.icon?.url || 'No Icon URL'
    const link = properties.link?.url || 'No Link'

    if (!groupedData[category]) {
      groupedData[category] = []
    }

    groupedData[category].push({
      icon,
      name,
      discripation: description,
      link,
    })
  })

  const formattedData = Object.keys(groupedData).map(category => ({
    title: category,
    innercard: groupedData[category]
  }))

  return formattedData
}

async function fetchProfile() {
  let results = []
  let hasMore = true
  let startCursor = undefined

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseIdProfile,
      start_cursor: startCursor,
    })

    results = results.concat(response.results)
    hasMore = response.has_more
    startCursor = response.next_cursor
  }

  if (results.length === 0) {
    throw new Error('No profile data found.')
  }

  const properties = results[0].properties

  const about = {
    author: properties.Name?.title[0]?.plain_text || 'No Name',
    bio: properties.Bio?.rich_text[0]?.plain_text || 'No Bio',
    workingon: properties.Project?.rich_text[0]?.plain_text || 'No Description',
    githublink: properties.GitHub?.url || '#',
    xlink: properties.xlink?.url || '#',
    docks: properties.docks?.url || '#'
  }

  return about
}

export async function buildFinalData() {
  try {
    const about = await fetchProfile()
    const projectData = await fetchAndFormatEntries()


    const finalData = [
      {
        about,
        data: projectData
      }
    ]

    console.dir(finalData)

    return finalData
  } catch (error) {
    console.dir('Error building final data:', error)
  }
}


buildFinalData()