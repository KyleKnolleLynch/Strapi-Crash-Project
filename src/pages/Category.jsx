import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'

const CATEGORY = gql`
    query GetCategory($id: ID!) {
        category(id: $id) {
            name,
            id,
            reviews {
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
    }
`

const Category = () => {
    const { id } = useParams()
    const { data, error, loading } = useQuery(CATEGORY, {
        variables: { id: id }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>



    return (
        <div>
            <h2>{data.category.name}</h2>
            {data.category.reviews.map(review => (
                <div key={review.id} className='review-card'>
                    <div className="rating">{review.rating}</div>
                    <h2>{review.title}</h2>

                    {review.categories.map(cat => (
                        <small key={cat.id}>{cat.name}</small>
                    ))}


                    <p>{review.body.substring(0, 200)}...</p>

                    <Link to={`../details/${review.id}`}>Read More</Link>
                </div>
            ))}
        </div>
    )
}

export default Category
