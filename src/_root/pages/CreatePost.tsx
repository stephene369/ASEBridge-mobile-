import { PostForm } from '../../components/forms/PostForm'

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container ">
        <div className='max-w-5xl flex-start gap-3 justify-start w-full '>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
            <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>

        <PostForm action='Create'/>
      </div>
    </div>
  )
}

export default CreatePost