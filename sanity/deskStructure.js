import S from '@sanity/desk-tool/structure-builder';
import { GiCalendar } from '@react-icons/all-files/gi/GiCalendar';
import { FaAddressCard } from '@react-icons/all-files/fa/FaAddressCard';

export default () =>
  S.list()
    .title('MENU')
    .items([
      S.listItem()
        .title('The Team')
        .icon(FaAddressCard)
        .child(
          S.list()
            // Sets a title for our new list
            .title('Rosters')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title('Coaches')
                .schemaType('coaches')
                .child(S.documentTypeList('coaches').title('Staff')),

              S.listItem()
                .title('JV')
                .schemaType('roster')
                .child(
                  S.documentTypeList('roster')
                    .title('JV Players')
                    .filter('_type == "roster" && team[0] == "JV"')
                ),

              S.listItem()
                .title('Varsity')
                .schemaType('roster')
                .child(
                  S.documentTypeList('roster')
                    .title('Varsity Players')
                    .filter('_type == "roster" && team[0] == "Varsity"')
                ),
            ])
        ),
      S.listItem()
        .title('Schedule')
        .icon(GiCalendar)
        .child(
          S.list()
            // Sets a title for our new list
            .title('Schedule')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title('2021')
                .schemaType('schedules')
                .child(
                  S.documentTypeList('schedules')
                    .title('Games')
                    .filter(
                      '_type == "schedules" && seasons[0]._ref == "c000dbd3-450d-46aa-ac42-1ed914777b91"'
                    )
                ),
              S.listItem()
                .title('2020')
                .schemaType('schedules')
                .child(
                  S.documentTypeList('schedules')
                    .title('Games')
                    .filter(
                      '_type == "schedules" && seasons[0]._ref == "0e2d22de-db15-4510-b5e8-63832b863ecd"'
                    )
                ),
              S.listItem()
                .title('2019')
                .schemaType('schedules')
                .child(
                  S.documentTypeList('schedules')
                    .title('Games')
                    .filter(
                      '_type == "schedules" && seasons[0]._ref == "913e3ac1-c9db-4112-b978-ac05c583b0fa"'
                    )
                ),
              S.listItem()
                .title('2018')
                .schemaType('schedules')
                .child(
                  S.documentTypeList('schedules')
                    .title('Games')
                    .filter(
                      '_type == "schedules" && seasons[0]._ref == "5b57f9cf-ff98-4ed0-8b6c-944df9399e4a"'
                    )
                ),
              S.listItem()
                .title('2017')
                .schemaType('schedules')
                .child(
                  S.documentTypeList('schedules')
                    .title('Games')
                    .filter(
                      '_type == "schedules" && seasons[0]._ref == "87e172e1-3c2a-4790-b00d-b3e2808ba72a"'
                    )
                ),
              S.listItem()
                .title('2016')
                .schemaType('schedules')
                .child(
                  S.documentTypeList('schedules')
                    .title('Games')
                    .filter(
                      '_type == "schedules" && seasons[0]._ref == "543babcc-ff7a-410c-bd49-25cc5008cc18"'
                    )
                ),
              S.listItem()
                .title('2015')
                .schemaType('schedules')
                .child(
                  S.documentTypeList('schedules')
                    .title('Games')
                    .filter(
                      '_type == "schedules" && seasons[0]._ref == "fb825573-6c4b-4385-9e0e-563f18c57aef"'
                    )
                ),
              S.listItem()
                .title('2014')
                .schemaType('schedules')
                .child(
                  S.documentTypeList('schedules')
                    .title('Games')
                    .filter(
                      '_type == "schedules" && seasons[0]._ref == "73700209-9e47-468c-8154-97905acc8e47"'
                    )
                ),
              S.listItem()
                .title('2013')
                .schemaType('schedules')
                .child(
                  S.documentTypeList('schedules')
                    .title('Games')
                    .filter(
                      '_type == "schedules" && seasons[0]._ref == "8a18e4d3-0959-4d0e-830b-e727e46d9ff4"'
                    )
                ),
            ])
        ),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['coaches', 'roster', 'schedules'].includes(listItem.getId())
      ),
    ]);
