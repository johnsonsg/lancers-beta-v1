import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// const path = require(`path`);

// console.log(process.env.SANITY_TOKEN)

module.exports = {
  siteMetadata: {
    title: `Manchester Lancers Football`,
    siteUrl: 'https://lancers.footbal',
    description: 'Manchester Lancers Football Page',
    author: 'Shawn Johnson and Ernie Hawkins',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      // This is the name of the plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'wkuk75c2',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: path.join(__dirname, `src`, `assets`, `images`),
    //   },
    // },
    `@apollo/client`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `html-webpack-plugin`,
    `webpack`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};
