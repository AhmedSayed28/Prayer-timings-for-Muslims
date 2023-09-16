import { CardContent, CardMedia, Typography, Card } from "@mui/material";
import PropTypes from "prop-types";
function CardType(props) {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={props.image}
          title='green iguana'
        />
        <CardContent>
          <h2>{props.name}</h2>
          <Typography variant='h3' color='text.secondary'>
            {props.time}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
CardType.propTypes = {
  name: PropTypes.string,
  time: PropTypes.string,
  image: PropTypes.node,
};

export default CardType;
