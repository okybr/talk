import React, { FunctionComponent } from "react";
import { graphql } from "react-relay";

import { QueryRenderer, useLocal } from "coral-framework/lib/relay";

import { LiveTabQuery } from "coral-stream/__generated__/LiveTabQuery.graphql";
import { LiveTabQueryLocal } from "coral-stream/__generated__/LiveTabQueryLocal.graphql";

import LiveStream from "./LiveStream";

const LiveTabQuery: FunctionComponent = () => {
  const [{ storyID, storyURL }] = useLocal<LiveTabQueryLocal>(graphql`
    fragment LiveTabQueryLocal on Local {
      storyID
      storyURL
    }
  `);

  if (!storyURL) {
    return null;
  }

  return (
    <QueryRenderer<LiveTabQuery>
      query={graphql`
        query LiveTabQuery($storyID: ID, $storyURL: String!) {
          viewer {
            ...LiveStreamContainer_viewer
          }
          settings {
            ...LiveStreamContainer_settings
          }
          story: stream(id: $storyID, url: $storyURL) {
            id
            ...LiveStreamContainer_story
          }
        }
      `}
      variables={{
        storyID,
        storyURL,
      }}
      render={(data) => {
        if (!data || !data.props || !data.props.story) {
          return null;
        }

        return (
          <LiveStream
            story={data.props.story}
            viewer={data.props.viewer}
            settings={data.props.settings}
            cursor={new Date().toISOString()}
          />
        );
      }}
    />
  );
};

export default LiveTabQuery;
