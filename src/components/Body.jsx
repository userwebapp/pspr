function Body ({children}) {
    const classBorder   = "border-bottom border-dark"
    const classPadding  = "px-0 pb-4 pt-5"
    const classMargin   = "mx-auto mt-4"
    const classBody     = `container-fluid bg-dark shadow 
        ${classMargin} 
        ${classPadding} 
        ${classBorder}`
    return ( <div className={classBody}>{children}</div> )
}

export default Body