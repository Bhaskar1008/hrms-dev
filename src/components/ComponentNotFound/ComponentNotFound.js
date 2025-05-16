
import notfound from '../../images/notfound.png'
import './ComponentNotFound.css'
import { Link } from 'react-router-dom';

const  ComponentNotFound =  () => {
    return(
            <div className="notfound">
                <img src={notfound} height="400px" width="500px"></img>
                <h4>Sorry. We couldn’t find that page :(</h4>
                <div className="homebutton">Go Home </div>
            </div>
    )
}
export default ComponentNotFound;