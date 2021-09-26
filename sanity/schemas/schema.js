// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
// Then we give our schema to the builder and provide the result to Sanity

import roster from './roster/roster';
import news from './news';
import season from './seasons';
import schedule from './schedule';
import coaches from './roster/coaches';
import sponsor from './sponsor';
import teams from './teams';
import venue from './venue';
import awards from './awards';
import records from './records';
import playerposition from './position';
import standings from './standings';
import results from '../objects/results/objects_results';
import hometeamresults from '../objects/results/objects_game_results_home';
import visitingteamresults from '../objects/results/objects_game_results_visiting';
import careerstats from '../objects/stats/objects_career_stats';
import playersgamestats from '../objects/stats/objects_players_game_stats';
import passingstats from '../objects/stats/objects_passing_stats';
import rushingstats from '../objects/stats/objects_rushing_stats';
import receivingstats from '../objects/stats/objects_receiving_stats';
import defensestats from '../objects/stats/objects_defense_stats';
import puntstats from '../objects/stats/objects_punt_stats';
import fgstats from '../objects/stats/objects_fg_stats';
import teamgamestats from '../objects/stats/objects_team_game_stats';
import playeraward from '../objects/awards/objects_awards';
import teamrecords from '../objects/records/objects_records';

export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    roster,
    news,
    season,
    schedule,
    coaches,
    sponsor,
    teams,
    venue,
    awards,
    results,
    hometeamresults,
    visitingteamresults,
    playersgamestats,
    passingstats,
    rushingstats,
    receivingstats,
    defensestats,
    puntstats,
    fgstats,
    teamgamestats,
    careerstats,
    playerposition,
    playeraward,
    records,
    teamrecords,
    standings,
  ]),
});
