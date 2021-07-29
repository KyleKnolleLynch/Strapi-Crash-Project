import { useParams, Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

// import useFetch from '../hooks/useFetch'

const REVIEW = gql`
    query GetReview($id: ID!) {
        review(id: $id) {
            title, 
            body,
            rating,
            id,
            categories {
                name,
                id
            }
        }
    }
`


const ReviewDetails = () => {
    const { id } = useParams()

    //  HTTP FETCH METHOD
    // const { data, error, loading } = useFetch(`http://localhost:1337/reviews/${id}`)

    const { data, error, loading } = useQuery(REVIEW, {
        variables: { id: id }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div className='review-card'>
            <div className="rating">{data.review.rating}</div>
            <h2>{data.review.title}</h2>
            {data.review.categories.map(cat => (
                <small key={cat.id}>{cat.name}</small>
            ))}

            <ReactMarkdown>{data.review.body}</ReactMarkdown>

            <Link to='/'>Back to Homepage</Link>
        </div>
    )
}

export default ReviewDetails
