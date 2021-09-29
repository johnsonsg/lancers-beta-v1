// gatsby-node.js
import path from 'path';

// Turn Roster Players into single pages.
async function turnRosterIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  // const playerTemplate = require.resolve('./src/components/players/player.js');
  const playerTemplate = require.resolve('./src/templates/players.js');
  // 2. Query all players / coaches
  const { data } = await graphql(`
    query RosterQuery {
      roster: allSanityRoster {
        nodes {
          id
          name
          number
          playerweight
          playerheight
          positions {
            positionvalue
          }
          playersgrade
          team
          slug {
            current
          }
          seasons {
            name
          }
          image {
            asset {
              fixed {
                src
              }
              fluid {
                src
              }
              source {
                url
              }
              url
            }
          }
        }
      }
      allSanitySeasons(sort: { fields: name, order: DESC }) {
        nodes {
          id
          name
        }
      }
    }
  `);
  console.log(data);
  // 3. Loop over each player and create a page for that player
  data.roster.nodes.forEach((player) => {
    console.log('Creating a page for ', player.name);
    actions.createPage({
      // What is the URL for this new page??
      path: `/player/${player.slug.current}`,
      component: playerTemplate,
      context: {
        slug: player.slug.current,
      },
    });
  });
}

// Turn Scheduled Games into single pages.
async function turnScheduleIntoPages({ graphql, actions }) {
  // 1. Get the template
  const scheduleTemplate = path.resolve('./src/templates/game-recap.js');
  // 2. Query all Games
  const { data } = await graphql(`
    query {
      schedule: allSanitySchedules {
        nodes {
          id
          week
          title
          slug {
            current
          }
          seasons {
            name
          }
          matchday
          datetime(formatString: "MM/DD")
          location {
            name
          }
          hometeamresults {
            homeTeam {
              name
              mascot
              image {
                asset {
                  fixed(width: 50) {
                    base64
                    src
                    srcSet
                  }
                  fluid(maxWidth: 50) {
                    base64
                    src
                    srcSet
                  }
                  url
                  title
                }
              }
            }
            thescore {
              firstqtr
              secondqtr
              thirdqtr
              fourthqtr
              final
              outcome
            }
          }
          visitingteamresults {
            visitingTeam {
              name
              mascot
              image {
                asset {
                  fixed(width: 50) {
                    base64
                    src
                    srcSet
                  }
                  fluid(maxWidth: 50) {
                    base64
                    src
                    srcSet
                  }
                  url
                  title
                }
              }
            }
            thescore {
              firstqtr
              secondqtr
              thirdqtr
              fourthqtr
              final
              outcome
            }
          }
          playerpassingstats {
            player {
              name
              slug {
                current
              }
            }
            passatt
            passcomp
            passint
            passtd
            passyds
          }
          playerrushingstats {
            player {
              name
              slug {
                current
              }
            }
            rushatt
            rushavg
            rushtd
            rushyds
          }
          playerreceivingstats {
            player {
              name
              slug {
                current
              }
            }
            rec
            recavg
            rectd
            recyds
          }
        }
      }
      allSanitySeasons(sort: { fields: name, order: DESC }) {
        nodes {
          id
          name
        }
      }
    }
  `);
  console.log(data);
  // 3. Loop over each Scheduled Game and create a page for that game
  data.schedule.nodes.forEach((recap) => {
    const currentYear = new Date().getFullYear();
    console.log(`Creating page for schedule`, recap.title);
    actions.createPage({
      // What is the URL for this new page??
      path: `/game/${recap.slug.current}`,
      component: scheduleTemplate,
      context: {
        slug: recap.slug.current,
        season: currentYear,
        // TODO regex for Season
        // seasonRegex: `/${season.name}/i`,
      },
    });
  });
}

// Turn Scheduled Games into single pages.
async function turnSeasonsIntoPages({ graphql, actions }) {
  // 1. Get the template
  const seasonTemplate = path.resolve('./src/templates/seasons.js');
  // 2. Query all Games
  const { data } = await graphql(`
    query {
      seasons: allSanitySeasons(sort: { fields: name, order: DESC }) {
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  console.log(data);
  // 3. Loop over each Season and create a page for that season
  data.seasons.nodes.forEach((season) => {
    // const currentYear = new Date().getFullYear();
    console.log(`Creating page for Season`, season.name);
    actions.createPage({
      // What is the URL for this new page??
      path: `/schedule/season/${season.slug.current}`,
      component: seasonTemplate,
      context: {
        slug: season.slug.current,
        // season: currentYear,
        // TODO regex for Season
        // seasonRegex: `/${season.name}/i`,
      },
    });
  });
}

// Turn Roster Coaches into single pages.
async function turnCoachesIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  // const playerTemplate = require.resolve('./src/components/players/player.js');
  const coachesTemplate = require.resolve('./src/templates/coaches.js');
  // 2. Query all players / coaches
  const { data } = await graphql(`
    query CoachesQuery {
      coaches: allSanityCoaches {
        nodes {
          slug {
            current
          }
          name
          title
          email
          mobile
          phone
          image {
            asset {
              fixed(height: 10, width: 10) {
                src
                srcSet
                base64
              }
              url
            }
          }
        }
      }
    }
  `);
  console.log(data);
  // 3. Loop over each player and create a page for that player
  data.coaches.nodes.forEach((coach) => {
    console.log('Creating a page for ', coach.name);
    actions.createPage({
      // What is the URL for this new page??
      path: `/coach/${coach.slug.current}`,
      component: coachesTemplate,
      context: {
        slug: coach.slug.current,
      },
    });
  });
}
// Turn News into single post pages.
async function turnNewsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const newsTemplate = require.resolve('./src/templates/blog-post.js');
  // 2. Query all posts from news
  const { data } = await graphql(`
    query NewsQuery {
      news: allSanityNews {
        nodes {
          id
          slug {
            current
          }
          name
          image {
            asset {
              url
              fluid {
                src
              }
            }
          }
          customized {
            children {
              text
            }
          }
        }
      }
    }
  `);
  console.log(data);
  // 3. Loop over each news posts and create a page for that post
  data.news.nodes.forEach((post) => {
    console.log('Creating a page for ', post.name);
    actions.createPage({
      // What is the URL for this new page??
      path: `/post/${post.slug.current}`,
      component: newsTemplate,
      context: {
        slug: post.slug.current,
      },
    });
  });
}

// 4. pass data
export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resloved before finishing this function.
  await Promise.all([
    turnRosterIntoPages(params),
    turnScheduleIntoPages(params),
    turnSeasonsIntoPages(params),
    turnCoachesIntoPages(params),
    turnNewsIntoPages(params),
  ]);
}

// WEBPACK
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
