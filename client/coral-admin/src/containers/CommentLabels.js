import {gql} from 'react-apollo';
import CommentLabels from '../components/CommentLabels';
import withFragments from 'coral-framework/hocs/withFragments';
import {getSlotFragmentSpreads} from 'coral-framework/utils';

const slots = [
  'adminCommentLabels',
];

export default withFragments({
  comment: gql`
    fragment CoralAdmin_CommentLabels_comment on Comment {
      hasParent
      status
      actions {
        __typename
        ... on FlagAction {
          reason
        }
        user {
          id
        }
      }
      ${getSlotFragmentSpreads(slots, 'comment')}
    }
  `
})(CommentLabels);
