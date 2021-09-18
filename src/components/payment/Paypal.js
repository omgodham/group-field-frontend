import React, {useRef,useState,useEffect} from 'react'
import {Typography,makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    
    msg: {
        margin: 'auto',
        color: theme.palette.success.main,
        fontFamily: ('Roboto ,sans-serif'),
        fontWeight: 400
    }
    
}))

export default function Paypal(props) {
    
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
                                    value: props.amount,
                                },
                            },
                        ],
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture()
                    console.log(order);
                    setSuccess(true);
                },
                onError: (err) => {
                    console.log(err);
                    setFail(true);
                }
                
            })
            .render(paypal.current);
            
        }, []);

    return (

        
        <div style={{display: 'flex',flexDirection: 'column'}}>

            <div ref={paypal}></div>
            {success && 
                <Typography variant='p' className={classes.msg}>
                    Thank You for the payment.
                </Typography>
            }
            {fail &&  
                <Typography vaiant='p' align='center' color='error'>
                    Please Try again.
                </Typography>
            }
        </div>
    )
}
