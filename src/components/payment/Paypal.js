import React, {useRef,useState,useEffect} from 'react'
import {Typography,makeStyles, Button, Snackbar} from '@material-ui/core'
import { updateLectures } from './helpers';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles(theme => ({
    
    msg: {
        margin: 'auto',
        color: theme.palette.success.main,
        fontFamily: ('Roboto ,sans-serif'),
        fontWeight: 400
    }
    
}))

export default function Paypal({amount,lectureIds,childIds,setShowPaypal}) {
    
    const classes = useStyles();
    const paypal = useRef();
    const [success,setSuccess] = useState(false);
    const [fail,setFail] = useState(false);

    
    useEffect(() => {
        
        window.paypal.Buttons({
            createOrder: (data,actions,err) => {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                            {
                                description: 'Group And Field',
                                amount: {
                                    currency_code: 'USD',
                                    value: amount,
                                },
                            },
                        ],
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture()
                    console.log(order);
                    setSuccess(true);
                    updateLectures(lectureIds,childIds).then(data => {
                        console.log(data)
                }).catch(err => console.log(err))


                },
                onError: (err) => {
                    console.log(err);
                    setFail(true);
                }
                
            })
            .render(paypal.current);
     
          
   

        }, []);

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setShowPaypal(false);
            setFail(false)
            setSuccess(false)
            window.location.reload()
        }

    return (

        <>


        <div ref={paypal}></div>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} variant='filled' severity="success">
            Thanks, we got your payment!
            </Alert>
        </Snackbar>
        <Snackbar open={fail} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} variant='filled' severity="error">
            Something went wrong please try again!
            </Alert>
        </Snackbar>
        
        </>
    )
}
