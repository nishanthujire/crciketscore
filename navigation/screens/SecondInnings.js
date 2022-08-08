import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, SwipeableListView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Button, Checkbox } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import Dialog from "react-native-dialog";

//db creaion
const db = SQLite.openDatabase('db.yz') // returns Database object



export default function SecondInnings({ navigation, route }) {
    const [checked, setChecked] = React.useState(false);
    const [widechecked, setWideChecked] = React.useState(false);
    const [noballchecked, setNoballChecked] = React.useState(false);
    const [byeschecked, setByesChecked] = React.useState(false);
    const [legbyeschecked, setLegbyesChecked] = React.useState(false);
    const [wicketchecked, setWicketChecked] = React.useState(false);



    //score hooks
    const [teamname, setTeamName] = useState('India');
    const [teamrun, setTeamrun] = useState(0);
    const [teamwickets, setTeamwickets] = useState(0);
    const [teamovers, setTeamovers] = useState(0);
    const [teamballs, setTeamballs] = useState(0);

    const [teamrunrate, setTeamrunrate] = useState(0);

    //striker batsman hooks
    const [strikername, setStrikername] = useState('Virat');
    const [strikerrun, setStrikerrun] = useState(0);
    const [strikerballfaced, setStrikerballfaced] = useState(0);
    const [strikerfourcount, setStrikefourcount] = useState(0);
    const [strikersixcount, setStrikesixcount] = useState(0);
    const [strikersrate, setStrikesrate] = useState(0);


    //non-striker batsman hooks
    const [nonstrikername, setNonstrikername] = useState('Rohit');
    const [nonstrikerrun, setNonstrikerrun] = useState(0);
    const [nonstrikerballfaced, setNonstrikerballfaced] = useState(0);
    const [nonstrikerfourcount, setNonstrikefourcount] = useState(0);
    const [nonstrikersixcount, setNonstrikesixcount] = useState(0);
    const [nonstrikersrate, setnonstrikesrate] = useState(0);


    //bowler hooks
    const [bowlername, setBowlername] = useState('Bumrah');
    const [bowlerover, setBowlerover] = useState(0);
    const [bowlerballs, setBowleballs] = useState(0);

    const [bowlermaiden, setBowlermaiden] = useState(0);
    const [bowlerruns, setBowlerruns] = useState(0);
    const [bowlerwickets, setBowlerwickets] = useState(0);
    const [bowlerer, setBowlerer] = useState(0);

    //penalty runs hooks
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);


    const [penaltyrun, setPenaltyruns] = useState(0);


    const showDialog = () => {
        setVisible(true);
    };



    const handleCancel = () => {
        setVisible(false);
    };

    const handleOK = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        setVisible(false);
        penaltyrunsclicked();
    };


    //user run clicked hooks
    const [userrunsclicked, setUserrunsClicked] = useState(0);
    const [wicketfallen, setWicketfallen] = useState(false);











    //global variables
    var runs = 0, sruns = 0, bruns = 0, strikerate = 0, fourcount = 0, sixcount = 0, wicketcount = 0, tempstrikerrun = 0, lastball = 0;
    var overs, balls, sballfaced, strikerball = 0, strikrate2 = 0, bowlerrun2 = 0;
    var bover = 0, bballs = 0;
    var wideruns = 1;
    var noballruns = 1, wickets = 0, maiden = 0;
    //bowler economy rare and team current run rate
    var ber, teamrr, bwicket = 0;
    //wicket global variables
    var out, newbatsman, outtype, support;
    //retired batsman global variables
    var retired, replaced;
    var newbowlername = "sam";
    //var lastballrun = 0;
    var wickett = false;

    //var finalrr = 0;
    var targetscore = 0, targetover = 0, targetrr = 0;


    //fetch data from first inning screen
    targetscore = route.params.targetscore;
    //targetscore = 100;

    //console.log("target score ", targetscore)
    //targetover = 10;
    targetover = route.params.targetover;


    // console.log("target over ", targetover)

    targetrr = route.params.requiredrr;
    //  console.log("target runrate ", targetrr);

    var tempwinscore = targetscore;
    var tempwinballs = targetover * 6;
    var remruns, remballs;

    //hooks for remaing runs and balls to win 
    const [winscore, setWinscore] = useState(tempwinscore);
    const [winballs, setWinballs] = useState(tempwinballs)





    //each over runs
    const [theArray, setTheArray] = useState([]);


    //when user clicks one to six scores button
    const zeroClicked = () => {
        //over runs



        untickcheckbox();
        lastball = 0;
        setUserrunsClicked(lastball);
        if (wicketchecked) {
            //overs runs 
            setTheArray(oldArray => [...oldArray, 'W']);
            wickets = teamwickets + 1;
            setTeamwickets(wickets);
            //bowler wicket
            bwicket = bowlerwickets + 1;
            setBowlerwickets(bwicket);
            navigation.navigate("FallOfWicket2");


        }
        else {
            //overs runs 
            setTheArray(oldArray => [...oldArray, 0]);
            //wide
            if (widechecked) {

                //team runs
                runs = teamrun + wideruns;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);

                //bowler runs
                bruns = bowlerruns + 1;
                setBowlerruns(bruns);
                setWideChecked(false);


            }
            //no ball
            else if (noballchecked) {
                //team runs
                runs = teamrun + noballruns;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);
                //striker run
                sruns = strikerrun + 0;
                setStrikerrun(sruns);
                //bowler runs
                bruns = bowlerruns + 1;
                setBowlerruns(bruns);

                //stiker ball faced
                incrementstrikerballfaced();
                setNoballChecked(false);

            }

            else {
                //team runs
                runs = teamrun + 0;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);
                if (byeschecked || legbyeschecked) {
                    //batsman runs
                    sruns = strikerrun + 0;
                    setStrikerrun(sruns);
                    setByesChecked(false);
                    setLegbyesChecked(false);
                    //bowler runs
                    bruns = bowlerruns;
                    setBowlerruns(bruns);


                }
                else {
                    //batsman runs
                    sruns = strikerrun + 0;
                    setStrikerrun(sruns);
                    //bowler runs
                    bruns = bowlerruns + 0;
                    setBowlerruns(bruns);



                }



                //overs runs
                incrementovers();
                //stiker ball faced
                incrementstrikerballfaced();
                //increment bowler overs
                incrementbowlerovers();
                //calculate strike rate of striker batsman
                //calculateStrikerate(strikerrun,strikerballfaced);
            }
        }









    };
    const oneClicked = () => {
        untickcheckbox();
        lastball = 1;
        setUserrunsClicked(lastball);
        if (wicketchecked) {
            //overs runs 
            setTheArray(oldArray => [...oldArray, 'W']);
            wickets = teamwickets + 1;
            setTeamwickets(wickets);
            //bowler wicket
            bwicket = bowlerwickets + 1;
            setBowlerwickets(bwicket);
            navigation.navigate("FallOfWicket2");
        }
        else {
            //overs runs 
            //over runs
            setTheArray(oldArray => [...oldArray, 1]);
            //wide
            if (widechecked) {
                //team runs
                runs = teamrun + wideruns + 1;

                setTeamrun(runs);
                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);

                //bowler runs
                bruns = bowlerruns + wideruns + 1;
                setBowlerruns(bruns);

                setWideChecked(false);


            }
            //no ball
            else if (noballchecked) {
                //team runs
                runs = teamrun + noballruns + 1;
                setTeamrun(runs);
                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);
                //striker run
                sruns = strikerrun + 1;
                setStrikerrun(sruns);
                //bowler runs
                bruns = bowlerruns + 1 + noballruns;
                setBowlerruns(bruns);

                //stiker ball faced
                incrementstrikerballfaced();
                //changing crease for odd runs
                changecrease();

                setNoballChecked(false);

            }
            else {
                runs = teamrun + 1;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);


                //byes
                if (byeschecked || legbyeschecked) {
                    //batsman runs
                    sruns = strikerrun;
                    setStrikerrun(sruns);
                    setByesChecked(false);
                    setLegbyesChecked(false);
                    //bowler runs
                    bruns = bowlerruns;
                    setBowlerruns(bruns);

                }
                else {
                    sruns = strikerrun + 1;
                    setStrikerrun(sruns);

                    //bowler runs
                    bruns = bowlerruns + 1;
                    setBowlerruns(bruns);


                }





                incrementovers();
                incrementstrikerballfaced();
                incrementbowlerovers();
                //changing crease for odd runs
                changecrease();
            }

        }








    };
    const twoClicked = () => {
        untickcheckbox();
        lastball = 2
        setUserrunsClicked(lastball);
        if (wicketchecked) {
            //overs runs 
            setTheArray(oldArray => [...oldArray, 'W']);
            wickets = teamwickets + 1;
            setTeamwickets(wickets);
            //bowler wicket
            bwicket = bowlerwickets + 1;
            setBowlerwickets(bwicket);
            navigation.navigate("FallOfWicket2");
        }
        else {
            //overs runs 
            //over runs
            setTheArray(oldArray => [...oldArray, 2]);
            //wide
            if (widechecked) {
                //team runs
                runs = teamrun + wideruns + 2;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);

                //bowler runs
                bruns = bowlerruns + wideruns + 2;
                setBowlerruns(bruns);

                setWideChecked(false);


            }
            //no ball
            else if (noballchecked) {
                //team runs
                runs = teamrun + noballruns + 2;
                setTeamrun(runs);
                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);
                //striker run
                sruns = strikerrun + 2;
                setStrikerrun(sruns);
                //bowler runs
                bruns = bowlerruns + 2 + noballruns;
                setBowlerruns(bruns);

                //stiker ball faced
                incrementstrikerballfaced();
                //changing crease for odd runs


                setNoballChecked(false);

            }
            else {
                runs = teamrun + 2;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);


                if (byeschecked || legbyeschecked) {
                    //batsman runs
                    sruns = strikerrun;
                    setStrikerrun(sruns);
                    setByesChecked(false);
                    setLegbyesChecked(false);
                    //bowler runs
                    bruns = bowlerruns;
                    setBowlerruns(bruns);

                }
                else {
                    sruns = strikerrun + 2;
                    setStrikerrun(sruns);

                    //bowler runs
                    bruns = bowlerruns + 2;
                    setBowlerruns(bruns);

                }



                incrementovers();
                incrementstrikerballfaced();
                incrementbowlerovers();
            }
        }




    };
    const threeClicked = () => {
        untickcheckbox();
        lastball = 3;
        setUserrunsClicked(lastball);

        if (wicketchecked) {
            //overs runs 
            setTheArray(oldArray => [...oldArray, 'W']);
            wickets = teamwickets + 1;
            setTeamwickets(wickets);
            //bowler wicket
            bwicket = bowlerwickets + 1;
            setBowlerwickets(bwicket);
            navigation.navigate("FallOfWicket2");

        }
        else {
            //overs runs 
            //over runs
            setTheArray(oldArray => [...oldArray, 3]);
            //wide
            if (widechecked) {
                //team runs
                runs = teamrun + wideruns + 3;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);

                //bowler runs
                bruns = bowlerruns + wideruns + 3;
                setBowlerruns(bruns);

                setWideChecked(false);


            }
            //no ball
            else if (noballchecked) {
                //team runs
                runs = teamrun + noballruns + 3;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);

                //striker run
                sruns = strikerrun + 3;
                setStrikerrun(sruns);
                //bowler runs
                bruns = bowlerruns + 3 + noballruns;
                setBowlerruns(bruns);

                //stiker ball faced
                incrementstrikerballfaced();
                //changing crease for odd runs
                changecrease();

                setNoballChecked(false)
                    ;

            }
            else {
                runs = teamrun + 3;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);

                if (byeschecked || legbyeschecked) {
                    //batsman runs
                    sruns = strikerrun;
                    setStrikerrun(sruns);
                    setByesChecked(false);
                    setLegbyesChecked(false);
                    //bowler runs
                    bruns = bowlerruns;
                    setBowlerruns(bruns);

                }
                else {
                    sruns = strikerrun + 3;
                    setStrikerrun(sruns);

                    //bowler runs
                    bruns = bowlerruns + 3;
                    setBowlerruns(bruns);

                }





                incrementovers();
                incrementstrikerballfaced();
                incrementbowlerovers();

                //changing crease for odd runs
                changecrease();
            }
        }



    };
    const fourClicked = () => {
        untickcheckbox();
        lastball = 4;
        setUserrunsClicked(lastball);
        if (wicketchecked) {
            //overs runs 
            setTheArray(oldArray => [...oldArray, 'W']);
            wickets = teamwickets + 1;
            setTeamwickets(wickets);
            //bowler wicket
            bwicket = bowlerwickets + 1;
            setBowlerwickets(bwicket);
            navigation.navigate("FallOfWicket2");
        }
        else {
            //overs runs 
            //over runs
            setTheArray(oldArray => [...oldArray, 4]);
            //wide
            if (widechecked) {
                //team runs
                runs = teamrun + wideruns + 4;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);

                //bowler runs
                bruns = bowlerruns + wideruns + 4;
                setBowlerruns(bruns);

                setWideChecked(false);


            }
            //no ball
            else if (noballchecked) {
                //team runs
                runs = teamrun + noballruns + 4;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);
                //striker run
                sruns = strikerrun + 4;
                setStrikerrun(sruns);
                //bowler runs
                bruns = bowlerruns + 4 + noballruns;
                setBowlerruns(bruns);

                //stiker ball faced
                incrementstrikerballfaced();


                fourcount = strikerfourcount + 1;
                setStrikefourcount(fourcount);



                setNoballChecked(false);

            }
            else {
                runs = teamrun + 4;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);
                if (byeschecked || legbyeschecked) {
                    //batsman runs
                    sruns = strikerrun;
                    setStrikerrun(sruns);
                    setByesChecked(false);
                    setLegbyesChecked(false);
                    //bowler runs
                    bruns = bowlerruns;
                    setBowlerruns(bruns);

                }
                else {
                    sruns = strikerrun + 4;
                    setStrikerrun(sruns);
                    fourcount = strikerfourcount + 1;
                    setStrikefourcount(fourcount);

                    //bowler runs
                    bruns = bowlerruns + 4;
                    setBowlerruns(bruns);


                }




                incrementovers();
                incrementstrikerballfaced();
                incrementbowlerovers();
            }
        }




    };
    const fiveClicked = () => {
        untickcheckbox();
        lastball = 5;
        setUserrunsClicked(lastball);

        if (wicketchecked) {
            //overs runs 
            setTheArray(oldArray => [...oldArray, 'W']);
            wickets = teamwickets + 1;
            setTeamwickets(wickets);
            //bowler wicket
            bwicket = bowlerwickets + 1;
            setBowlerwickets(bwicket);
            navigation.navigate("FallOfWicket2");

        }
        else {
            //overs runs 
            //over runs
            setTheArray(oldArray => [...oldArray, 5]);
            //wide
            if (widechecked) {
                //team runs
                runs = teamrun + wideruns + 5;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);

                //bowler runs
                bruns = bowlerruns + wideruns + 5;
                setBowlerruns(bruns);

                setWideChecked(false);


            }
            //no ball
            else if (noballchecked) {
                //team runs
                runs = teamrun + noballruns + 5;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);
                //striker run
                sruns = strikerrun + 5;
                setStrikerrun(sruns);
                //bowler runs
                bruns = bowlerruns + 5 + noballruns;
                setBowlerruns(bruns);

                //stiker ball faced
                incrementstrikerballfaced();
                //changing crease for odd runs
                changecrease();

                setNoballChecked(false);

            }
            else {
                runs = teamrun + 5;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);

                if (byeschecked || legbyeschecked) {
                    //batsman runs
                    sruns = strikerrun;
                    setStrikerrun(sruns);
                    setByesChecked(false);
                    setLegbyesChecked(false);
                    //bowler runs
                    bruns = bowlerruns;
                    setBowlerruns(bruns);

                }
                else {
                    sruns = strikerrun + 5;
                    setStrikerrun(sruns);

                    //bowler runs
                    bruns = bowlerruns + 5;
                    setBowlerruns(bruns);

                }





                incrementovers();
                incrementstrikerballfaced();
                incrementbowlerovers();

                //changing crease for odd runs
                changecrease();
            }
        }




    };
    const sixClicked = () => {
        untickcheckbox();
        lastball = 6;
        setUserrunsClicked(lastball);

        if (wicketchecked) {
            //overs runs 
            setTheArray(oldArray => [...oldArray, 'W']);
            wickets = teamwickets + 1;
            setTeamwickets(wickets);
            //bowler wicket
            bwicket = bowlerwickets + 1;
            setBowlerwickets(bwicket);
            navigation.navigate("FallOfWicket2");
        }
        else {
            //overs runs 
            //over runs
            setTheArray(oldArray => [...oldArray, 6]);
            //wide
            if (widechecked) {
                //team runs
                runs = teamrun + wideruns + 6;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);

                //bowler runs
                bruns = bowlerruns + wideruns + 6;
                setBowlerruns(bruns);

                setWideChecked(false);


            }
            //no ball
            else if (noballchecked) {
                //team runs
                runs = teamrun + noballruns + 6;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);
                //striker run
                sruns = strikerrun + 6;
                setStrikerrun(sruns);
                //bowler runs
                bruns = bowlerruns + 6 + noballruns;
                setBowlerruns(bruns);

                //stiker ball faced
                incrementstrikerballfaced();
                //changing crease for odd runs


                sixcount = strikersixcount + 1;
                setStrikesixcount(sixcount);


                setNoballChecked(false);

            }
            else {

                runs = teamrun + 6;
                setTeamrun(runs);

                //remaing runs
                remruns = targetscore - runs;
                setWinscore(remruns);

                if (byeschecked || legbyeschecked) {
                    //batsman runs
                    sruns = strikerrun;
                    setStrikerrun(sruns);
                    setByesChecked(false);
                    setLegbyesChecked(false);
                    //bowler runs
                    bruns = bowlerruns;
                    setBowlerruns(bruns);

                }
                else {

                    sruns = strikerrun + 6;
                    setStrikerrun(sruns);

                    sixcount = strikersixcount + 1;
                    setStrikesixcount(sixcount);

                    //bowler runs
                    bruns = bowlerruns + 6;
                    setBowlerruns(bruns);


                }




                incrementovers();
                incrementstrikerballfaced();
                incrementbowlerovers();
            }
        }




    };
    //penalty runs
    const penaltyrunsclicked = () => {
        if (!penaltyrun) {

        }
        var p = Number(penaltyrun);
        //console.log(typeof(penaltyrun));
        runs = teamrun + p;
        setTeamrun(runs);

        //bowler runs
        bruns = bowlerruns + p;
        setBowlerruns(bruns);
        //changing penalty runs to zero
        setPenaltyruns(0);

    }



    //incrementing overs
    const incrementovers = () => {
        //overs
        balls = teamballs + 1;
        //remaining balls to win
        remballs = winballs - 1;
        setWinballs(remballs)

        if (balls == 6) {
            overs = teamovers + 1;
            balls = 0;
            setTeamovers(overs);
        }
        setTeamballs(balls);
        //calculating team current runrate
        if (balls != 0) {
            var teambowled = '' + teamovers + '.' + balls;
        }
        else {
            teambowled = teamovers + 1;
        }
        //console.log(bowled);
        teamrr = runs / teambowled;
        //float precision fot 2 points
        var teamrr2 = teamrr.toFixed(2);
        setTeamrunrate(teamrr2);






    }
    const save = () => {


        var temparray = theArray;
        // console.log(lastball); 
        var len = temparray.length;
        if (wickett) {
            temparray[len] = "W";
            temparray.pop();
            wickett = false;
            setWicketfallen(wickett);

        }
        else if (lastball >= 0) {
            temparray[len] = lastball;
        }
        else {
            temparray[len] = 0;
        }
        var arr = JSON.stringify(temparray);
        setBowlerruns((state) => {
            bowlerrun2 = state;
            return state;
        });
        db.transaction(tx => {
            tx.executeSql('INSERT INTO overs (match_id,teamname,innings,overno,overun,bowler,striker,nonstriker,balls) values (?,?,?,?,?,?,?,?,?)', [1, teamname, 1, teamovers, bowlerrun2, bowlername, strikername, nonstrikername, arr],
                (tx, results) => {

                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        console.log('inserted overs data ');


                    }
                },
                (tx, error) => console.log('Error', error))
        });

    }
    //incrementing bowler overs
    const incrementbowlerovers = () => {


        //bowler overs
        bballs = bowlerballs + 1;
        if (bballs == 6) {
            if (bowlerruns == 0) {
                maiden = bowlermaiden + 1;
                console.log(maiden);
                setBowlermaiden(maiden);
            }
            //console.log('ggg')
            bover = bowlerover + 1;
            bballs = 0;
            setBowlerover(bover);
            setBowleballs(bballs);

            navigation.navigate('SelectNewBowler2');

            //clearing the array
            save();
            setTheArray([]);
            BowlerDatainsert();
        }
        setBowleballs(bballs);


        if (balls != 0) {
            var bowled = '' + bowlerover + '.' + bballs;
        }
        else {
            bowled = bowlerover + 1;
        }
        //console.log(bowled);
        ber = bruns / bowled;
        //float precision fot 2 points
        ber = ber.toFixed(2);


        setBowlerer(ber);



    }
    //incrementing striker ball faced
    const incrementstrikerballfaced = () => {
        //ball faced
        sballfaced = strikerballfaced + 1;
        setStrikerballfaced(sballfaced);
        //calculating strikerate


        //calculating strikerate
        if (sballfaced != 0) {
            strikerate = (sruns / sballfaced) * 100;
            strikerate = strikerate.toFixed(2);
            strikerate = Number(strikerate);
            setStrikesrate(strikerate);
        }
        else {
            strikerate = 0;
            setStrikesrate(strikerate);

        }

    }
    //swapping palyers
    const swap = () => {
        var tname, trun, tball, tsix, tfour, tstrikerate;
        //copying non striker all data into temp variable
        tname = nonstrikername;
        trun = nonstrikerrun;
        tball = nonstrikerballfaced;
        tfour = nonstrikerfourcount;
        tsix = nonstrikersixcount;
        tstrikerate = nonstrikersrate;



        //swapping striker data with non-striker data
        setStrikername(tname);
        setStrikerrun(trun);
        setStrikerballfaced(tball);
        setStrikesixcount(tsix);
        setStrikefourcount(tfour);
        setStrikesrate(tstrikerate);
        //swapping non- striker data with striker data
        setNonstrikername(strikername);
        setNonstrikerrun(strikerrun);
        setNonstrikerballfaced(strikerballfaced);
        setNonstrikesixcount(strikersixcount);
        setNonstrikefourcount(strikerfourcount);
        setnonstrikesrate(strikersrate);





    }
    //changing crease of batsman after odd runs
    const changecrease = () => {
        var tname, trun, tball, tsix, tfour, tstrikerate;
        //copying non striker all data into temp variable
        tname = nonstrikername;
        trun = nonstrikerrun;
        tball = nonstrikerballfaced;
        tfour = nonstrikerfourcount;
        tsix = nonstrikersixcount;
        tstrikerate = nonstrikersrate;

        //swapping striker data with non-striker data
        setStrikername(tname);
        setStrikerrun(trun);
        setStrikerballfaced(tball);
        setStrikesixcount(tsix);
        setStrikefourcount(tfour);
        setStrikesrate(tstrikerate);
        //swapping non- striker data with striker data
        setNonstrikername(strikername);
        setNonstrikerrun(sruns);
        setNonstrikerballfaced(sballfaced);
        setNonstrikesixcount(strikersixcount);
        setNonstrikefourcount(strikerfourcount);
        setnonstrikesrate(strikerate);

        //console.log(strikerate);


    }
    //untick all the checkbox
    const untickcheckbox = () => {
        setWideChecked(false);
        setNoballChecked(false);
        setByesChecked(false);
        setLegbyesChecked(false);
        setWicketChecked(false);

    }
    //************************************************************************* */
    // back end code begins

    useEffect(() => {
        createTable3();
        //deleteTable();
    }, []);






    //use effect hook to fetch news batmsan and out value
    //getting data from pervious screen
    useEffect(() => {

        if (route.params?.newbatsman && route.params?.out && route.params?.outtype) {
            if (route.params?.support) {
                support = route.params?.support;
                console.log('support  is  : ', support)
            }
            newbatsman = route.params?.newbatsman;
            console.log("new batsman : ", newbatsman);
            out = route.params?.out;
            console.log(out, " is out");
            outtype = route.params?.outtype;
            console.log("output type ", outtype);
            Runoutrunincrement();

        }

    }, [route.params?.newbatsman, route.params?.out, route.params?.outtype]);

    //use Effect hook to fetch  retired batsman value 
    useEffect(() => {
        if (route.params?.retired || route.params?.replaced) {

            retired = route.params?.retired;
            console.log(retired, " is retired")

            replaced = route.params?.replaced;
            console.log("replaced by  : ", replaced);
            outtype = "Retired";
            BatsmanDatainsert();


        }


    }, [route.params?.retired, route.params?.replaced]);

    //use Effect hook to fetch  retired bowler name 
    useEffect(() => {
        if (route.params?.bowler) {

            newbowlername = route.params?.bowler;
            console.log("bowler is ", newbowlername);
            setBowlername(newbowlername);


        }

    }, [route.params?.bowler]);






    //batting and bowling,wickets table creation 
    const createTable3 = () => {

        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS batting (match_id INTEGER ,teamname TEXT,innings INTEGER,' +
                'batsman_name TEXT,run INTEGER,ball INTEGER,six INTEGER,four INTEGER,' +
                'strikerate TEXT,out_type TEXT,support TEXT,bowler TEXT)'
            )
        });
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS bowling (match_id INTEGER ,teamname TEXT,innings INTEGER,' +
                'bowler_name TEXT,over INTEGER,maiden INTEGER,bowler_run INTEGER,wickets INTEGER,economy INTEGER)')
        });
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS overs (match_id INTEGER ,teamname TEXT,innings INTEGER,' +
                'overno INTEGER,overun INTEGER,bowler TEXT,striker TEXT,nonstriker TEXT,balls TEXT)')
        });




    }
    //run out run increment function
    const Runoutrunincrement = () => {
        wickett = true;
        setWicketfallen(wickett);
        if (outtype === "run out striker" || outtype === "run out non-striker") {
            runs = teamrun + userrunsclicked;
            setTeamrun(runs);

            //remaing runs
            remruns = targetscore - runs;
            setWinscore(remruns);
            sruns = strikerrun + userrunsclicked;
            setStrikerrun(sruns);

            //bowler runs
            bruns = bowlerruns + userrunsclicked;
            setBowlerruns(bruns);
        }
        console.log("striker run ", strikerrun);
        console.log("striker ball faced ", sballfaced);


        incrementovers();
        incrementstrikerballfaced();
        var strikerate3;
        //calculating strikerate
        if (sballfaced != 0) {
            strikerate3 = (strikerrun / sballfaced) * 100;
            strikerate3 = strikerate3.toFixed(2);
            strikerate3 = Number(strikerate3);
            setStrikesrate(strikerate3);
        }
        else {
            strikerate3 = 0;
            setStrikesrate(strikerate3);

        }

        incrementbowlerovers();
        //bowling
        var bowled;
        if (bowlerballs != 0) {
            bowled = '' + bowlerover + '.' + bowlerballs;
        }
        else {
            bowled = bowlerover + 1;

        }
        //console.log(bowled);
        ber = bowlerruns / bowled;
        //float precision fot 2 points
        ber = ber.toFixed(2);

        setBowlerer(ber);
        //storing data
        BatsmanDatainsert();



    };

    //storing batsman data when wickets falls
    const BatsmanDatainsert = () => {

        //getting latest value of strikerrun
        setStrikerrun((state) => {
            tempstrikerrun = state;
            return state;
        });

        //getting latest value of striker ball faced
        setStrikerballfaced((state) => {
            strikerball = state;
            return state;
        });

        //getting latest value of four count
        setStrikefourcount((state) => {
            fourcount = state;
            return state;
        });
        //getting latest value of six count
        setStrikesixcount((state) => {
            sixcount = state;
            return state;
        });
        //getting latest value of strikerate
        setStrikesrate((state) => {
            strikrate2 = state;
            return state;
        });

        // if striker is out insert striker data
        if (out === "striker" || retired === strikername) {

            db.transaction(tx => {
                tx.executeSql('INSERT INTO batting (match_id,teamname,innings,batsman_name,run,ball,six,four,strikerate,out_type,support,bowler) values (?,?,?,?,?,?,?,?,?,?,?,?)', [1, teamname, 1, strikername, tempstrikerrun, strikerball, sixcount, fourcount, strikrate2, outtype, support, bowlername],
                    (tx, results) => {

                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            console.log('inserted striker data');
                            //alert('inserted striker data');

                            //reseting all the striker data values
                            // condition if player is retied
                            if (outtype === "Retired") {
                                setStrikername(replaced);
                            }
                            else {
                                setStrikername(newbatsman);
                            }
                            setStrikerrun(0);
                            setStrikerballfaced(0);
                            setStrikefourcount(0);
                            setStrikesixcount(0);
                            setStrikesrate(0);

                        }
                    },
                    (tx, error) => console.log('Error', error))
            });
        }

        // if non-striker is out insert striker data
        else if (out === "nonstriker" || retired === nonstrikername) {
            //inserting non-striker data
            db.transaction(tx => {
                tx.executeSql('INSERT INTO batting (match_id,teamname,innings,batsman_name,run,ball,six,four,strikerate,out_type,support,bowler) values (?,?,?,?,?,?,?,?,?,?,?,?)', [1, teamname, 1, nonstrikername, nonstrikerrun, nonstrikerballfaced, nonstrikersixcount, nonstrikerfourcount, nonstrikersrate, outtype, support, bowlername],
                    (tx, results) => {

                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            console.log('inserted non-striker data ');
                            //alert('inserted non-striker data ');

                            // condition if player is retied
                            if (outtype === "Retired") {
                                setNonstrikername(replaced);
                            }
                            else {
                                setNonstrikername(newbatsman);
                            }
                            setNonstrikerrun(0);
                            setNonstrikerballfaced(0);
                            setNonstrikefourcount(0);
                            setNonstrikesixcount(0);
                            setnonstrikesrate(0);
                        }
                    },
                    (tx, error) => console.log('Error', error))
            });
        }

    }


    //storing bowler data after each over 
    const BowlerDatainsert = () => {
        //console.log("bowler wicket is ",bwicket);
        //getting bowler wicker latest value

        setBowlerwickets((state) => {
            wicketcount = state;
            return state;
        });
        setBowlerruns((state) => {
            bowlerrun2 = state;
            return state;
        });

        //inserting bowler data
        db.transaction(tx => {
            tx.executeSql('INSERT INTO bowling (match_id,teamname,innings,bowler_name,over,maiden,bowler_run,wickets,economy) values (?,?,?,?,?,?,?,?,?)', [1, teamname, 1, bowlername, bover, bowlermaiden, bowlerrun2, wicketcount, ber],
                (tx, results) => {

                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        console.log('inserted bowler data ');

                        //reseting bowler values
                        setBowlername(newbowlername);
                        setBowlerover(0);
                        setBowleballs(0);
                        setBowlermaiden(0);
                        setBowlerruns(0);
                        setBowlerwickets(0);
                        setBowlerer(0);


                    }
                },
                (tx, error) => console.log('Error', error))
        });
    }

    const go = () => {

        navigation.navigate('DetailsScreen');
    }

    //deleting data
    const deleteTable = () => {
        db.transaction(tx => {
            tx.executeSql(
                'delete from overs'
            )
        })
    }













    return (

        <View style={styles.container} >

            <ScrollView>
                <View style={styles.modal}>
                    {/* dialogue for additonal run  */}
                    <Dialog.Container visible={visible}>
                        <Dialog.Title style={{ fontWeight: 'bold' }}>End of the Second inning ?</Dialog.Title>
                        <Dialog.Description style={{ color: 'green', fontSize: 15 }}>Scored runs(including overthrows)?</Dialog.Description>
                        <Dialog.Input label=" " style={{ marginTop: -20 }} onChangeText={(value) => setPenaltyruns(value)} keyboardType="numeric" maxLength={1}></Dialog.Input>
                        <Dialog.Button label="Cancel" onPress={handleCancel} />
                        <Dialog.Button label="Ok" onPress={handleOK} />
                    </Dialog.Container>
                </View>




                <View style={styles.contentBody}>
                    <View style={styles.cardhead}>
                        <Text style={{ marginBottom: 5 }}>{teamname} , 2nd innings</Text>
                        <Text style={{ marginTop: 5, marginLeft: 0 }}>CRR</Text>
                        <Text style={{ marginTop: 5, marginRight: 0 }}>Target</Text>
                        <Text style={{ marginTop: 5, marginRight: 7 }}>RR</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.text}>{teamrun} - {teamwickets}</Text>
                        <Text style={styles.overs}> ({teamovers}.{teamballs}) </Text>
                        <Text style={styles.crr}> {teamrunrate} </Text>
                        <Text style={styles.target}> {targetscore}</Text>
                        <Text style={styles.rr}> 1.0 </Text>

                    </View>
                    <Text style={{ color: "green", margin: 2 }}>{teamname} need {winscore} runs in {winballs} balls</Text>

                </View>
                <View style={styles.battingBody}>
                    <Grid >

                        <Row style={{ height: 40, borderBottomWidth: 1, borderBottomColor: '#000' }}>
                            <Col size={60}>
                                <Text style={{ marginBottom: 10, marginRight: 0 }}>Batting </Text>
                            </Col>
                            <Col size={15} >
                                <Text style={{ marginBottom: 10 }}>R </Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>B </Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>6s </Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>4s </Text>
                            </Col>
                            <Col size={10}>
                                <Text style={{ marginBottom: 10 }}>SRR </Text>
                            </Col>
                        </Row>
                        <Row style={{ height: 40, marginTop: 5 }} >
                            <Col size={60}>
                                <Text style={{ marginBottom: 10, marginRight: 0, color: 'green' }}>{strikername} * </Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{strikerrun}</Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{strikerballfaced} </Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{strikersixcount} </Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{strikerfourcount} </Text>
                            </Col>
                            <Col size={10} >
                                <Text style={{ marginBottom: 10 }}>{strikersrate} </Text>
                            </Col>
                        </Row>
                        <Row style={{ height: 40 }}>
                            <Col size={60}>
                                <Text style={{ marginBottom: 10, marginRight: 0, color: 'green' }}>{nonstrikername}</Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{nonstrikerrun}</Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{nonstrikerballfaced}</Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{nonstrikersixcount}</Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{nonstrikerfourcount}</Text>
                            </Col>
                            <Col size={10}>
                                <Text style={{ marginBottom: 10 }}>{nonstrikersrate}</Text>
                            </Col>
                        </Row>
                        <Row style={{ height: 40, borderBottomWidth: 1, borderBottomColor: '#000' }}>
                            <Col size={60}>
                                <Text style={{ marginBottom: 10, marginRight: 0 }}>Bowling </Text>
                            </Col>
                            <Col size={15} >
                                <Text style={{ marginBottom: 10 }}>O</Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>M </Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>R </Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>W </Text>
                            </Col>
                            <Col size={10}>
                                <Text style={{ marginBottom: 10 }}>ER </Text>
                            </Col>
                        </Row>
                        <Row style={{ height: 40, marginTop: 15, }}>
                            <Col size={60}>
                                <Text style={{ marginBottom: 10, marginRight: 0, color: 'green' }}>{bowlername} </Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{bowlerover}.{bowlerballs}</Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{bowlermaiden}</Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{bowlerruns}</Text>
                            </Col>
                            <Col size={15}>
                                <Text style={{ marginBottom: 10 }}>{bowlerwickets}</Text>
                            </Col>
                            <Col size={10}>
                                <Text style={{ marginBottom: 10 }}>{bowlerer} </Text>
                            </Col>
                        </Row>
                    </Grid>
                </View>
                <View>
                    <View style={styles.container2}>
                        <Text style={{ marginRight: 10 }}>This Over : </Text>
                        <ScrollView horizontal={true}>
                            {/* showing runs in each over */}

                            {theArray.map(run => <View style={styles.circle} >
                                <Text style={styles.textover} key={run.toString()}>{run}</Text>
                            </View>)}



                        </ScrollView>
                    </View>
                    <View style={styles.CheckBoxContainer}>
                        <View style={styles.Checkboxlist}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox
                                    style={styles.Checkboxstyle}
                                    status={widechecked ? 'checked' : 'unchecked'}
                                    onPress={() => { setWideChecked(!widechecked); }}
                                    color={'green'}
                                    uncheckColor={'red'}
                                />
                                <Text >Wide</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                                <Checkbox
                                    style={styles.Checkboxstyle}
                                    status={noballchecked ? 'checked' : 'unchecked'}
                                    onPress={() => { setNoballChecked(!noballchecked); }}
                                    color={'green'}
                                    uncheckColor={'red'}
                                />
                                <Text >No Ball</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                                <Checkbox
                                    style={styles.Checkboxstyle}
                                    status={byeschecked ? 'checked' : 'unchecked'}
                                    onPress={() => { setByesChecked(!byeschecked); }}
                                    color={'green'}
                                    uncheckColor={'red'}
                                />
                                <Text >Byes</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox
                                    style={styles.Checkboxstyle}
                                    status={legbyeschecked ? 'checked' : 'unchecked'}
                                    onPress={() => { setLegbyesChecked(!legbyeschecked); }}
                                    color={'green'}
                                    uncheckColor={'red'}
                                />
                                <Text >Leg Byes</Text>
                            </View>
                        </View>
                        <View style={styles.Checkboxlist}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, }}>
                                <Checkbox
                                    style={styles.Checkboxstyle}
                                    status={wicketchecked ? 'checked' : 'unchecked'}
                                    onPress={() => { setWicketChecked(!wicketchecked); }}
                                    color={'green'}
                                    uncheckColor={'red'}
                                />
                                <Text style={{ marginRight: 10 }}>Wicket</Text>
                            </View>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}> */}
                            <Button

                                style={styles.Checkbutton}
                                color="#fff"
                                onPress={() =>
                                    //navigating to startmatch screen
                                    navigation.navigate('PlayerRetired2', {
                                        striker: strikername, nonstriker: nonstrikername
                                    })}

                            >Retire</Button>
                            <Button

                                style={styles.Checkbutton}
                                color="#fff"

                                onPress={swap}
                            >Swap </Button>
                        </View>
                        {/* </View> */}
                    </View>
                    <View>
                        <View style={styles.ScoreContainer}>
                            <View style={styles.Scorelist}>
                                <TouchableOpacity onPress={zeroClicked}>
                                    <View style={styles.Scorecircle} >

                                        <Text style={styles.textscore}>0</Text>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={oneClicked}>
                                    <View style={styles.Scorecircle} >

                                        <Text style={styles.textscore}>1</Text>

                                    </View>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={twoClicked}>
                                    <View style={styles.Scorecircle} >

                                        <Text style={styles.textscore}>2</Text>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={threeClicked}>
                                    <View style={styles.Scorecircle} >

                                        <Text style={styles.textscore}>3</Text>

                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.Scorelist}>
                                <TouchableOpacity onPress={fourClicked} >
                                    <View style={styles.Scorecircle} >

                                        <Text style={styles.textscore}>4</Text>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={fiveClicked}>
                                    <View style={styles.Scorecircle} >

                                        <Text style={styles.textscore}>5</Text>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={sixClicked}>
                                    <View style={styles.Scorecircle} >

                                        <Text style={styles.textscore}>6</Text>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>

                                    <View style={styles.Scorecircle}  >
                                        <TouchableOpacity onPress={go}
                                        //</View>onPress={showDialog}
                                        >
                                            <Text style={styles.textscore} >...</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </View>
            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: 40,
        backgroundColor: "#F7F7F7"

    },
    textover: {
        padding: 4,
        marginLeft: 6
    },
    textscore: {
        padding: 4,
        fontSize: 20,
        marginLeft: 19,
        marginTop: 11,
        alignItems: 'center',
    },
    container2: {
        margin: 10,
        borderRadius: 10,
        marginBottom: 2,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#fff',

        elevation: 10,
        shadowColor: '#171717',

    },
    circle: {
        marginLeft: 5,
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: "#fff",
        borderColor: 'grey',
        borderWidth: 1,
    },
    Scorecircle: {
        margin: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#fff",
        borderColor: 'green',
        textAlign: 'center',
        borderWidth: 2,
    },
    contentBody: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'space-between',
        elevation: 10,
        shadowColor: '#171717',

    },
    battingBody: {
        margin: 10,
        padding: 10,
        marginTop: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 220,
        borderRadius: 13,
        elevation: 10,
        shadowColor: '#171717',



    },
    ScoreContainer: {
        margin: 10,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 10,
        shadowColor: '#171717',
    },
    CheckBoxContainer: {
        margin: 10,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
        elevation: 10,
        shadowColor: '#171717',
    },
    Scorelist: {
        flexDirection: "row",
    },
    Checkboxlist: {
        flexDirection: "row",
        marginTop: 10,
    },
    Checkboxstyle: {
        marginLeft: 10,
        fontSize: 10,
        borderColor: '#fff'
    },
    Checkbutton: {
        backgroundColor: 'green',
        //padding: 5,
        marginLeft: 5,
        width: 120,
        height: 40,
        fontSize: 15

    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardhead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    text: {
        fontSize: 30
    },
    overs: {
        alignItems: 'flex-start',
        marginTop: 10,
        marginRight: 110,
    },
    crr: {
        alignItems: 'flex-start',
        marginTop: 10,
        paddingRight: 60,
        marginLeft: -60,
    },
    rr: {
        alignItems: 'flex-start',
        marginTop: 10,
        paddingRight: -80,
        paddingLeft: 30,
    },
    target: {
        alignItems: 'flex-start',
        marginTop: 10,
        marginRight: 10,
    },
    modal: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },


});
