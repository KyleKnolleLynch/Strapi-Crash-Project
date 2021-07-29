import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CATEGORIES = gql`
    query GetCategories {
        categories {
            name,
            id
        }
    }
`

const Header = () => {
    const { data, error, loading } = useQuery(CATEGORIES)

    if (loading) return <p>Loading Categories...</p>
    if (error) return <p>Error fetching categories</p>
   
    return (
        <div className='header'>
            <Link to='/'><h1>Robert E. Howard Reviews</h1></Link>
            <nav className='categories'>
                <span>Filter reviews by category: </span>
                {data.categories.map(category => (
                    <Link key={category.id} to={`/category/${category.id}`}>{category.name}</Link>
                ))}
            </nav>
        </div>
    )
}

export default Header
