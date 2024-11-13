import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { multiFormatDateString } from '../../lib/utils';
import { useUserContext } from '../../context/AuthContext';
import PostStats from './PostStats';
import profilePlaceholder from '/asebridge/assets/icons/profile-placeholder.svg';
import editIcon from '/asebridge/assets/icons/edit.svg';

type PostCardProps = {
  post: Models.Document
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  // console.log("post : ",post);

  try {
    return (
      <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/asebridge/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                profilePlaceholder
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/asebridge/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img
            src={editIcon}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/asebridge/post/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || profilePlaceholder}
          alt="post image"
          className="post-card_img"
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
    )
  } catch (error) {
    <h2>Empty</h2>
  }
}

export default PostCard