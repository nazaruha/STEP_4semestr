import React from "react"

const NotFound:React.FC = () => {
    return (
        // <h1 className="text-danger">Not Found.</h1>
        <Grid container spacing={3}>
  <Grid item xs>
    <Item>xs</Item>
  </Grid>
  <Grid item xs={6}>
    <Item>xs=6</Item>
  </Grid>
  <Grid item xs>
    <Item>xs</Item>
  </Grid>
</Grid>
    )
}

export default NotFound;