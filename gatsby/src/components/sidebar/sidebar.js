import React from 'react';
import { TwitterTimelineEmbed, TwitterFollowButton } from 'react-twitter-embed';
// Reference: https://morioh.com/p/9dd80c962d37
export default function Sidebar() {
  return (
    <div className="container">
      <TwitterFollowButton
        screenName="lancer_footbal"
        options={{ size: 'large' }}
        placeholder="Loading"
      />

      <div className="selfCenter standardWidth">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="lancer_footbal"
          options={{ height: 800 }}
          // theme="dark"
          noHeader
          noFooter
        />
      </div>
    </div>
  );
}
