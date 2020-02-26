import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";

import { Error as ErrorIcon } from "@material-ui/icons";
import { PersonOutline as PersonOutlineIcon } from "@material-ui/icons";

import { firestore } from "../../firebase";

import EmptyState from "../EmptyState";

import Loader from "../Loader";
import UserCard from "../UserCard";

const useStyles = makeStyles({
  grid: {
    margin: 0,
    width: "100%"
  }
});

function UserContent() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    return firestore
      .collection("users")
      .doc(userId)
      .onSnapshot(
        snapshot => {
          setLoading(false);
          setUser(snapshot.data());
        },
        error => {
          setLoading(false);
          setError(error);
        }
      );
  }, [userId]);

  if (error) {
    return (
      <EmptyState
        icon={<ErrorIcon />}
        title="Something went wrong"
        description="There was an error while trying to fetch the requested user"
      />
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <EmptyState
        icon={<PersonOutlineIcon />}
        title="User not found"
        description="The requested user was not found"
      />
    );
  }

  return (
    <Grid className={classes.grid} container justify="center" spacing={5}>
      <Grid item xs={6}>
        <UserCard user={user} />
      </Grid>
    </Grid>
  );
}

export default UserContent;
