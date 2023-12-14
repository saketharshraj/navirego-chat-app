// Array containing objects representing SQL queries & parsedQueries

export const queryList = [
    {
        u_id: 0,
        query: "SELECT * FROM articlesData;",
        parsedQuery: {}
    },
    {
        u_id: 1,
        query: "SELECT title, views, date_published FROM articlesData;",
        parsedQuery: {
            select: ['title', 'views', 'date_published'],
        }
    },
    {
        u_id: 2,
        query: "SELECT id, title, category, views, date_published, author_id FROM articlesData ORDER BY author_id;",
        parsedQuery: {
            select: ['id', 'title', 'category', 'views', 'date_published', 'author_id'],
            orderBy: 'author_id',
        }
    },
    {
        u_id: 3,
        query: "SELECT * FROM articlesData WHERE views < 7000 ORDER BY views DESC;",
        parsedQuery: {
            where: { views: { '<': 7000 } },
            orderBy: 'views',
            orderDirection: 'desc',
        }
    },
    {
        u_id: 4,
        query: "SELECT id, title, category, views FROM articlesData WHERE category = 'Technology';",
        parsedQuery: {
            select: ['id', 'title', 'category', 'views'],
            where: { category: 'Technology'},
        }
    },
    {
        u_id: 5,
        query: "SELECT * FROM articlesData WHERE author_id = 96 ORDER BY date_published DESC;",
        parsedQuery: {
            where: { author_id: { '=': 96 } },
            orderBy: 'date_published',
            orderDirection: 'desc',
        }
    },
]
