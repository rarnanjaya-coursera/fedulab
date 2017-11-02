import gql from 'graphql-tag';

export const UserDetailsQuery = gql`
  query UserDetailsQuery {
    user {
      id
      name
      picture
      isSuperuser
      emailAddress
    }
  }
`;

export const IdeaDetailQuery = gql`
  query IdeaDetailQuery($slug: String!) {
    Idea(slug: $slug) {
      id
      title
      tagline
      displayOrder
      slug
      description
      category
      courseraVideoUrl
      coverBackgroundUrl
      isBackgroundImageDark
      howToContribute
      slackUrl
      slideUrl
      youtubeVideoUrl
      createdAt
      updatedAt
      pitchedBy
      createdBy {
        name
        id
      }
      contributorsText
      contributors {
        name
        id
      }
      likes {
        id
        user {
          id
        }
      }
    }
  }
`;

export const IdeaListQuery = gql`
  query IdeaListQuery($isPresenting: Boolean) {
    allIdeas(filter: { isPresenting: $isPresenting }) {
      id
      title
      tagline
      displayOrder
      coverBackgroundUrl
      slug
      isPresenting
      createdAt
      contributors {
        name
      }
      pitchedBy
      createdBy {
        name
        id
      }
      likes {
        id
        user {
          id
        }
      }
    }
  }
`;

export const IdeaNextQuery = gql`
  query IdeaNextQuery($first: Int, $after: String) {
    allIdeas(first: $first, after: $after) {
      id
      slug
      title
      createdBy {
        name
        id
      }
    }
  }
`;

export const IdeaPrevQuery = gql`
  query IdeaPrevQuery($last: Int, $before: String) {
    allIdeas(last: $last, before: $before) {
      id
      slug
      title
    }
  }
`;

export const IdeaPresentBarQuery = gql`
  query IdeaPresentBarQuery($id: String) {
    before: allIdeas(last: 1, before: $id) {
      id
      slug
      title
    }
    after: allIdeas(first: 1, after: $id) {
      id
      slug
      title
      createdBy {
        name
        id
      }
    }
  }
`;

export const IdeaEditQuery = gql`
  query IdeaEditQuery($slug: String!) {
    Idea(slug: $slug) {
      id
      contributorsText
      category
      courseraVideoUrl
      coverBackgroundUrl
      description
      displayOrder
      estimatedFinishTime
      howToContribute
      isBackgroundImageDark
      needMyLaptop
      needPower
      needMonitor
      isPresenting
      slackUrl
      slug
      startTime
      tagline
      title
      youtubeVideoUrl
      pitchedBy
      createdBy {
        name
        id
      }
      contributors {
        name
        id
      }
    }
  }
`;

export const CreateIdeaMutation = gql`
  mutation createIdeaMutation(
    $contributorsIds: [ID!]
    $contributorsText: String
    $createdById: ID
    $makeathonId: ID
    $category: [IdeaCategory!]
    $courseraVideoUrl: String
    $coverBackgroundUrl: String!
    $isBackgroundImageDark: Boolean!
    $description: String!
    $displayOrder: Int!
    $estimatedFinishTime: DateTime!
    $howToContribute: String!
    $needMyLaptop: Boolean
    $needPower: Boolean
    $needMonitor: Boolean
    $isPresenting: Boolean
    $slackUrl: String
    $slug: String!
    $startTime: DateTime!
    $tagline: String!
    $title: String!
    $youtubeVideoUrl: String
    $pitchedBy: String
  ) {
    createIdea(
      contributorsIds: $contributorsIds
      contributorsText: $contributorsText
      createdById: $createdById
      makeathonId: $makeathonId
      category: $category
      courseraVideoUrl: $courseraVideoUrl
      coverBackgroundUrl: $coverBackgroundUrl
      isBackgroundImageDark: $isBackgroundImageDark
      description: $description
      displayOrder: $displayOrder
      estimatedFinishTime: $estimatedFinishTime
      howToContribute: $howToContribute
      needMyLaptop: $needMyLaptop
      needPower: $needPower
      needMonitor: $needMonitor
      isPresenting: $isPresenting
      slackUrl: $slackUrl
      slug: $slug
      startTime: $startTime
      tagline: $tagline
      title: $title
      youtubeVideoUrl: $youtubeVideoUrl
      pitchedBy: $pitchedBy
    ) {
      id
      category
      title
      description
      tagline
      slug
    }
  }
`;

export const UpdateIdeaMutation = gql`
  mutation updateIdeaMutation(
    $id: ID!
    $contributorsIds: [ID!]
    $contributorsText: String
    $createdById: ID
    $makeathonId: ID
    $category: [IdeaCategory!]
    $courseraVideoUrl: String
    $coverBackgroundUrl: String!
    $isBackgroundImageDark: Boolean!
    $description: String!
    $displayOrder: Int!
    $estimatedFinishTime: DateTime!
    $howToContribute: String!
    $needMyLaptop: Boolean
    $needPower: Boolean
    $needMonitor: Boolean
    $isPresenting: Boolean
    $slackUrl: String
    $slug: String!
    $startTime: DateTime!
    $tagline: String!
    $title: String!
    $youtubeVideoUrl: String
    $pitchedBy: String
  ) {
    updateIdea(
      id: $id
      contributorsIds: $contributorsIds
      contributorsText: $contributorsText
      createdById: $createdById
      makeathonId: $makeathonId
      category: $category
      courseraVideoUrl: $courseraVideoUrl
      coverBackgroundUrl: $coverBackgroundUrl
      isBackgroundImageDark: $isBackgroundImageDark
      description: $description
      displayOrder: $displayOrder
      estimatedFinishTime: $estimatedFinishTime
      howToContribute: $howToContribute
      needMyLaptop: $needMyLaptop
      needPower: $needPower
      needMonitor: $needMonitor
      isPresenting: $isPresenting
      slackUrl: $slackUrl
      slug: $slug
      startTime: $startTime
      tagline: $tagline
      title: $title
      youtubeVideoUrl: $youtubeVideoUrl
      pitchedBy: $pitchedBy
    ) {
      id
      category
      title
      description
      tagline
      slug
      isBackgroundImageDark
      contributorsText
    }
  }
`;

export const ClaimIdeaMutation = gql`
  mutation claimIdeaMutation($id: ID!, $createdById: ID) {
    updateIdea(id: $id, createdById: $createdById) {
      id
      title
      slug
      createdBy {
        name
        id
      }
    }
  }
`;

export const DeleteIdeaMutation = gql`
  mutation deleteIdeaMutation($id: ID!) {
    deleteIdea(id: $id) {
      id
      title
      slug
    }
  }
`;

export const IdeaLikeMutation = gql`
  mutation IdeaLikeMutation($ideaId: ID!, $userId: ID!) {
    createLike(ideaId: $ideaId, userId: $userId) {
      id
      createdAt
      idea {
        id
        title
        likes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export const IdeaUnlikeMutation = gql`
  mutation IdeaUnlikeMutation($myLikeId: ID!) {
    deleteLike(id: $myLikeId) {
      createdAt
      id
      idea {
        id
        likes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;
