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
    {
        u_id: 6,
        query: "SELECT author_id, title, category, date_published FROM articlesData WHERE date_published > 2023-07-01 ORDER BY date_published;",
        parsedQuery: {
            select: ['author_id', 'title', 'category', 'date_published'],
            where: { date_published: { '>': "2023-07-01" } },
            orderBy: 'date_published',
        }
    },

    {
        u_id: 7,
        query: "SELECT category, views, title FROM articlesData WHERE WHERE category IN ('Science', 'Business', 'Health');",
        parsedQuery: {
            select: ['category', 'views', 'title'],
            where: { category: ['Science', 'Business', 'Health']},
        }
    },

    {
        u_id: 8,
        query: "SELECT views, category, date_published, author_id FROM articlesData WHERE views BETWEEN 7000 AND 9000 ORDER BY author_id;",
        parsedQuery: {
            select: ['views', 'category', 'date_published', 'author_id'],
            where: { views: { 'BETWEEN': [7000, 9000] } },
            orderBy: 'author_id'
        }
    },
    {
        u_id: 9,
        query: "SELECT title, category, views, date_published FROM articlesData WHERE category = 'Business' ORDER BY date_published DESC LIMIT 7;",
        parsedQuery: {
            select: ['title', 'category', 'views', 'date_published'],
            where: { category: 'Business'},
            orderBy: 'date_published',
            orderDirection: 'desc',
            limit: 7,
        }
    },
    {
        u_id: 10,
        query: "SELECT author_id, COUNT(*) AS total_articles_published FROM articlesData GROUP BY author_id;",
        parsedQuery: {
            select: ['author_id'],
            groupBy: 'author_id',
            aggregate: { category: 'COUNT', alias: 'total_articles_published' },
        }
    },
    {
        u_id: 11,
        query: "SELECT * FROM articlesData WHERE category = 'Health' AND views > 4321 ORDER BY views ASC LIMIT 23;",
        parsedQuery: {
            where: { category: 'Health', views: { '>': 4321 } },
            orderBy: 'views',
            orderDirection: 'asc',
            limit: 23,
        }
    },
    {
        u_id: 12,
        query: "SELECT date_published, title, views, author_id FROM articlesData WHERE date_published BETWEEN '2023-02-01' AND '2023-03-31' ORDER BY date_published;",
        parsedQuery: {
            select: ['date_published', 'title', 'views', 'author_id'],
            where: { date_published: { 'BETWEEN': ['2023-02-01', '2023-03-31'] } },
            orderBy: 'date_published'
        }
    },
    {
        u_id: 13,
        query: "SELECT category, COUNT(*) AS count_category FROM articlesData GROUP BY category;",
        parsedQuery: {
            select: ['category'],
            groupBy: 'category',
            aggregate: { category: 'COUNT', alias: 'count_category' },
        }
    },
    {
        u_id: 14,
        query: "SELECT category, SUM(views) AS total_views FROM articlesData GROUP BY category;",
        parsedQuery: {
            select: ['category', 'views'],
            groupBy: 'category',
            aggregate: { views: 'SUM', alias: 'total_views' },
        }
    },
    {
        u_id: 15,
        query: "SELECT views, date_published, category FROM articlesData WHERE category IN ('Science', 'Entertainment') AND views > 15000 AND date_published BETWEEN '2022-01-01' AND '2023-12-31' ORDER BY views DESC;",
        parsedQuery: {
            select: ['views', 'date_published', 'category'],
            where: { category: ['Science', 'Entertainment'], views: { '>': 15000 }, date_published: { 'BETWEEN': ['2022-01-01', '2023-12-31'] } },
            orderBy: 'views',
            orderDirection: 'desc',
        }
    },
    {
        u_id: 16,
        query: "SELECT category, COUNT(views) AS views_greater_than_17k FROM articlesData WHERE views > 17000 GROUP BY category",
        parsedQuery: {
            select: ['category', 'views'],
            where: { views: { '>': 17000 } },
            groupBy: 'category',
            aggregate: { views: 'COUNT', alias: 'views_greater_than_17k' },
        }
    },
]
