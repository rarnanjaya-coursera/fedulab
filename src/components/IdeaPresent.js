// @flow
import React from 'react';
import { StyleSheet, Box, css } from '@coursera/coursera-ui';
import { withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import cx from 'classnames';

import { withGQLLoadingOrError } from 'src/components/withBranches';
import IdeaLoadPreCheck from 'src/components/IdeaLoadPreCheck';
import IdeaNext from 'src/components/IdeaNext';
import animationUtils from 'src/utils/animationUtils';

import { IdeaDetailQuery } from 'src/constants/appQueries';
import { DEFAULT_COVER_BG } from 'src/constants/appConstants';

const styles = StyleSheet.create({
  banner: {
    textAlign: 'center',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

type Props = {
  data: Object,
  userId: String,
  isSuperuser: boolean,
  slug: string,
};

function IdeaPresent({
  data: { loading, error, Idea: idea },
  slug,
  userId,
  isSuperuser,
  ...rest
}: Props) {
  const {
    title,
    coverBackgroundUrl,
    isBackgroundImageDark,
    createdBy,
    pitchedBy,
    courseraVideoUrl,
    youtubeVideoUrl,
  } = idea;
  const videoUrl = courseraVideoUrl || youtubeVideoUrl;

  return (
    <div {...css('IdeaPresent header-margin-offset', animationUtils.fadeInSlow)}>
      <Box
        rootClassName={styles.banner}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundImage: `url(${coverBackgroundUrl || DEFAULT_COVER_BG})` }}
      >
        <div className={cx('p-a-3', { inverse: isBackgroundImageDark })}>
          <h1 className="font-weight-900" style={{ fontSize: '4.8rem' }}>
            {title}
          </h1>
          <h3>
            {videoUrl && (
              <a href={videoUrl} target="_blank">
                Video{' '}
              </a>
            )}
          </h3>
          <h3 className="text-secondary font-lg">{pitchedBy || createdBy.name}</h3>
          <div className="p-a-2 font-lg">
            <IdeaNext first={1} after={idea.id} isPresentationMode />
          </div>
        </div>
      </Box>
    </div>
  );
}

export default compose(
  withRouter,
  withProps(({ match }) => ({
    slug: match.params.ideaSlug,
    dataFieldName: 'Idea',
  })),
  graphql(IdeaDetailQuery),
  withGQLLoadingOrError(IdeaLoadPreCheck),
)(IdeaPresent);
