import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'


//  CUSTOM HOOK FOR HTTP METHOD //
// import useFetch from '../hooks/useFetch'


const REVIEWS = gql`
    query GetReviews {
        reviews {
            id, 
            rating,
            title,
            body,
            categories {
                name,
                id
            }
        }
    }
`


const Homepage = () => {
    //  HTTP FETCH METHOD   //
    // const { data, error, loading } = useFetch('http://localhost:1337/reviews')

    const { loading, error, data } = useQuery(REVIEWS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>


    return (
        <div>
            {data.reviews.map(review => (
                <div key={review.id} className='review-card'>
                    <div className="rating">{review.rating}</div>
                    <h2>{review.title}</h2>
                    {review.categories.map(cat => (
                        <small key={cat.id}>{cat.name}</small>
                    ))}

                    <p>{review.body.substring(0, 200)}...</p>

                    <Link to={`details/${review.id}`}>Read More</Link>
                </div>
            ))}
        </div>
    )
}

export default Homepage
