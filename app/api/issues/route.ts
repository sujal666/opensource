
// import { NextResponse } from 'next/server'
// import { Octokit } from 'octokit'

// const octokit = new Octokit({
//   auth: process.env.GITHUB_TOKEN,
// })

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url)
//   const language = searchParams.get('language') || ''
//   const label = searchParams.get('label') || 'good-first-issue'

//   try {
//     const query = `is:issue is:open label:"${label}" ${language ? `language:${language}` : ''}`.trim()

//     const { data } = await octokit.rest.search.issuesAndPullRequests({
//       q: query,
//       per_page: 100,
//       headers: {
//         'X-GitHub-Api-Version': '2022-11-28',
//       },
//     })

//     const repos = data.items.map((item) => ({
//       id: item.id.toString(),
//       title: item.title,
//       url: item.html_url,
//       repoName: item.repository_url.split('/').slice(-2).join('/'),
//       language,
//       difficulty: label,
//       createdAt: item.created_at,
//       updatedAt: item.updated_at,
//       comments: item.comments,
//       repoUrl: `https://github.com/${item.repository_url.split('/').slice(-2).join('/')}`,
//       state: item.state,
//       body: item.body || '',
//       labels: item.labels.map((label: any) =>
//         typeof label === 'string' ? label : label.name || ''
//       ),
//     }))

//     return NextResponse.json(repos)
//   } catch (error) {
//     console.error('GitHub API error:', error)
//     return NextResponse.json({ error: 'Failed to fetch GitHub issues' }, { status: 500 })
//   }
// }


// import { NextResponse } from 'next/server'
// import { Octokit } from 'octokit'
// import fs from 'fs/promises'
// import path from 'path'

// const CACHE_FILE = path.join(process.cwd(), 'cache', 'issues.json') // make sure cache dir exists

// const octokit = new Octokit({
//   auth: process.env.GITHUB_TOKEN,
// })

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url)
//   const language = searchParams.get('language') || ''
//   const label = searchParams.get('label') || 'good-first-issue'

//   const query = `is:issue is:open label:"${label}" ${language ? `language:${language}` : ''}`.trim()

//   try {
//     // const { data } = await octokit.rest.search.issuesAndPullRequests({
//     //   q: query,
//     //   per_page: 100,
//     //   headers: {
//     //     'X-GitHub-Api-Version': '2022-11-28',
//     //   },
//     // })
//     const { data } = await octokit.request("GET /search/issues", {
//   q: query,
//   per_page: 100,
//   headers: {
//     'X-GitHub-Api-Version': '2022-11-28',
//   },
// })


//     const repos = data.items.map((item) => ({
//       id: item.id.toString(),
//       title: item.title,
//       url: item.html_url,
//       repoName: item.repository_url.split('/').slice(-2).join('/'),
//       language,
//       difficulty: label,
//       createdAt: item.created_at,
//       updatedAt: item.updated_at,
//       comments: item.comments,
//       repoUrl: `https://github.com/${item.repository_url.split('/').slice(-2).join('/')}`,
//       state: item.state,
//       body: item.body || '',
//       labels: item.labels.map((label: any) =>
//         typeof label === 'string' ? label : label.name || ''
//       ),
//     }))

//     // ✅ Save to cache
//     await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true })
//     await fs.writeFile(CACHE_FILE, JSON.stringify(repos, null, 2))

//     return NextResponse.json(repos)
//   } catch (error: any) {
//     console.error('GitHub API error:', error.message)

//     try {
//       // 🔁 Fallback to cached issues
//       const cached = await fs.readFile(CACHE_FILE, 'utf-8')
//       const cachedIssues = JSON.parse(cached)
//       console.warn('Using cached issues instead.')

//       return NextResponse.json(cachedIssues)
//     } catch (cacheError) {
//       console.error('No cached issues found:', cacheError)
//       return NextResponse.json(
//         { error: 'Failed to fetch GitHub issues and no cached data available.' },
//         { status: 500 }
//       )
//     }
//   }
// }












import { graphql } from '@octokit/graphql'
import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const CACHE_FILE = path.join(process.cwd(), 'cache', 'issues.json') // fallback cache

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const language = searchParams.get('language') || ''
  const label = searchParams.get('label') || 'good-first-issue'

  const queryString = `is:issue is:open label:"${label}" ${language ? `language:${language}` : ''}`

  const query = `
    query SearchIssues($queryString: String!) {
      search(query: $queryString, type: ISSUE, first: 100) {
        nodes {
          ... on Issue {
            id
            title
            url
            repository {
              nameWithOwner
            }
            createdAt
            updatedAt
            comments {
              totalCount
            }
            state
            body
            labels(first: 10) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `

  try {
    const data = await graphqlWithAuth(query, { queryString })
//@ts-ignore
    const repos = data.search.nodes.map((item: any) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      repoName: item.repository.nameWithOwner,
      language,
      difficulty: label,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      comments: item.comments.totalCount,
      repoUrl: `https://github.com/${item.repository.nameWithOwner}`,
      state: item.state,
      body: item.body || '',
      labels: item.labels.nodes.map((l: any) => l.name),
    }))

    // Cache it
    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true })
    await fs.writeFile(CACHE_FILE, JSON.stringify(repos, null, 2))

    return NextResponse.json(repos)
  } catch (error) {
    console.error('GraphQL error:', error)

    try {
      const cached = await fs.readFile(CACHE_FILE, 'utf-8')
      const fallback = JSON.parse(cached)
      console.warn('Returning cached fallback data.')
      return NextResponse.json(fallback)
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub issues and no cache available.' },
        { status: 500 }
      )
    }
  }
}












// import { graphql } from '@octokit/graphql'
// import { NextResponse } from 'next/server'
// import fs from 'fs/promises'
// import path from 'path'

// const CACHE_FILE = path.join(process.cwd(), 'cache', 'issues.json')

// const graphqlWithAuth = graphql.defaults({
//   headers: {
//     authorization: `token ${process.env.GITHUB_TOKEN}`,
//   },
// })

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url)
//   const language = searchParams.get('language') || ''
//   const label = searchParams.get('label') || 'good-first-issue'

//   const queryString = `is:issue is:open label:"${label}"`

//   const query = `
//     query SearchIssues($queryString: String!) {
//       search(query: $queryString, type: ISSUE, first: 100) {
//         nodes {
//           ... on Issue {
//             id
//             title
//             url
//             repository {
//               nameWithOwner
//               primaryLanguage {
//                 name
//               }
//             }
//             createdAt
//             updatedAt
//             comments {
//               totalCount
//             }
//             state
//             body
//             labels(first: 10) {
//               nodes {
//                 name
//               }
//             }
//           }
//         }
//       }
//     }
//   `

//   try {
//     const data = await graphqlWithAuth(query, { queryString })
// //@ts-ignore
//     const allIssues = data.search.nodes.map((item: any) => {
//       const repoLanguage = item.repository.primaryLanguage?.name || 'Unknown'

//       return {
//         id: item.id,
//         title: item.title,
//         url: item.url,
//         repoName: item.repository.nameWithOwner,
//         language: repoLanguage,
//         difficulty: label,
//         createdAt: item.createdAt,
//         updatedAt: item.updatedAt,
//         comments: item.comments.totalCount,
//         repoUrl: `https://github.com/${item.repository.nameWithOwner}`,
//         state: item.state,
//         body: item.body || '',
//         labels: item.labels.nodes.map((l: any) => l.name),
//       }
//     })

//     // Filter by language in-code (case-insensitive)
//     const filteredIssues = language
//     //@ts-ignore
//       ? allIssues.filter(issue => issue.language.toLowerCase() === language.toLowerCase())
//       : allIssues

//     // Cache
//     await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true })
//     await fs.writeFile(CACHE_FILE, JSON.stringify(filteredIssues, null, 2))

//     return NextResponse.json(filteredIssues)
//   } catch (error) {
//     console.error('GraphQL error:', error)

//     try {
//       const cached = await fs.readFile(CACHE_FILE, 'utf-8')
//       const fallback = JSON.parse(cached)
//       console.warn('Returning cached fallback data.')
//       return NextResponse.json(fallback)
//     } catch {
//       return NextResponse.json(
//         { error: 'Failed to fetch GitHub issues and no cache available.' },
//         { status: 500 }
//       )
//     }
//   }
// }
