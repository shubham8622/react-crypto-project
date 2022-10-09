const DashboardButton = (props) => {
  return (
    <>
        {props.text.map((ele,index)=>{
          return <li className="nav-items" id={ele} key={index}><a href="http://localhost:3000/" className="nav-links">{ele}</a></li>
        })}
    </>
  )
}

export default DashboardButton