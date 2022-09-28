const posts = [
    'post1',
    'post2',
    'post3'
];

function PostsList() {
    return (
        <ul>
            {PostsList.map((post, index) => (
                <li> key={`${posts}-${index}`>{ post }}</li>
            ))}
        </ul>
    )
}

export default PostsList