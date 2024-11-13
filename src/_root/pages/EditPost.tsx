import { PostForm } from '../../components/forms/PostForm'
import { useGetPostById } from '../../lib/react-query/queriesAndMutations';
import { Loader } from 'lucide-react';
import { useParams } from 'react-router-dom'


const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id);


  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full  max-w-5xl">



  <i className='bx bx-edit' style={{ fontSize: '36px', color: 'black' }}></i>
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {isLoading ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  );
};

export default EditPost;
