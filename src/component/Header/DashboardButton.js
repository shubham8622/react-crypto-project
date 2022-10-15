import {Link} from 'react-router-dom';
const DashboardButton = (props) => {
  return (
    <>
        {props.text.map((ele,index)=>{
          return (
            <>
              <li className="nav-items" id={ele.title} key={index}>
                <Link className="nav-links" to={ele.url}>
                {ele.title}
                </Link>
              </li>
            </>
          )
        })}
    </>
  )
}

export default DashboardButton