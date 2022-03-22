const express = require('express');
const router = new express.Router();
const logger = require('../logger/winston');

router.get('/', async (req, res) => {

    try {

        const formData = [
            {
                elementId: 0,
                type: "text",
                title: "Enter Your Zip Code"
            },

            {
                elementId: 1,
                type: "toggle",
                title: "Your Age",
                options: [
                    "< 18",
                    "19-24",
                    "25-34",
                    "35-49",
                    "50-64",
                    "65 >"
                ]
            },

            {
                elementId: 2,
                type: "checkbox",
                options: [
                    "I'm married",
                    "I'm currently insured",
                    "I own multiple vehicles",
                    "I own a house"
                ]
            }
        ]


        res.status(200).send(formData)

    } catch (error) {
        logger.log('error', error.message)
        res.status(500).send({
            message: "internal Server Error"
        })
    }
})

router.post('/', async (req, res) => {

    try {

        const data = req.body.data
        console.log(data)

        let validAge = false
        let validZip = false

        data.forEach(element => {
            if (element?.title === 'Your Age') validAge = true
            if (element?.title === 'Enter Your Zip Code') validZip = true
        });

        if (validAge && validZip)
            res.status(200).send([
                {
                    imgSrc: "https://www.fseasons.ps/wp-content/uploads/2018/01/Insurance-Premium.jpg",
                    title: "We ensure you",
                    benefits: ["Low-cost", "Fast-delivery"],
                    zipList: ["23456", "09756"],
                    ages: "18-65"
                },
                {
                    imgSrc: "https://image.shutterstock.com/image-photo/hand-holding-piece-puzzle-word-260nw-1415392502.jpg",
                    title: "In god we trust",
                    benefits: ["Best-service", "Flexible-plans"],
                    zipList: ["23456", "09756"],
                    ages: "18-65"
                }
            ])

        else
            res.status(400).send({
                message: "Form Validation Failed!"
            })

    } catch (error) {
        logger.log('error', error.message)
        res.status(500).send({
            message: "Internal server error!"
        })
    }
})



module.exports = router