import { useQuery, gql } from "@apollo/client";

export const useGetGallery = () => {
  const GET_GALLERY = gql`
    query GetGallery {
      pages(where: {title: "Gallery"}) {
        nodes {
          galleryacf {
            galleryImages {
              altText
              id
              sourceUrl
              caption
              sizes
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
  `;
  const { data: galleryData } = useQuery(GET_GALLERY, {
    fetchPolicy: 'no-cache',
  });
  return galleryData?.pages.nodes[0].galleryacf.galleryImages
}