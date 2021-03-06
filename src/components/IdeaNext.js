// @flow
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import _ from 'underscore';

import { withGQLLoadingOrError } from 'src/components/withBranches';

import { IdeaNextQuery } from 'src/constants/appQueries';
import { LOADER_SIZE } from 'src/components/IdeaPrev';

type Props = {
  isPresentationMode: boolean,
  idea: {
    title: string,
    slug: string,
  },
};

function IdeaNext({ idea: { title, slug }, isPresentationMode }: Props) {
  return (
    <span className="p-l-1">
      {isPresentationMode && <span>Next: </span>}
      <Link to={`/ideas/${slug}${isPresentationMode ? '/show' : ''}`}>
        {`${title} ${isPresentationMode ? '' : '>'}`}{' '}
      </Link>
    </span>
  );
}

export default compose(
  withRouter,
  graphql(IdeaNextQuery, {
    props: ({ data: { loading, error, allIdeas } }) => ({
      dataFieldName: 'idea',
      shouldRenderNothing: true,
      loading,
      error,
      idea: _(allIdeas).first(),
      isLoadingCircle: true,
      loaderSize: LOADER_SIZE,
    }),
  }),
  withGQLLoadingOrError(),
)(IdeaNext);
