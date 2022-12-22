import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Checkbox, Paragraph } from 'react-native-paper'

type WeekdayCheckboxProps = {
    title: string,
    value: number,
    boxChecked: boolean,
    handleCheck: Function
}

/**
 * This component is a clickable list item, displaying a day. The whole area is clickable
 * and will check the box on tap. 
 * 
 * @param title String describing the day
 * @param boxChecked Contains a boolean whether it is checked or not on loading the component
 * @param value Number describing the day of the week. Start with 0 for sunday
 * @param handleCheck Function for adding the value to the days array for the reminder or removing it from said array
 * @returns functional component for a weekday
 */
const WeekdayCheckbox = ({ title, boxChecked, value, handleCheck }: WeekdayCheckboxProps) => {

    const [checked, setChecked] = React.useState(boxChecked)

    const handleSelect = () => {
        setChecked(!checked)
        handleCheck(!checked, value)
    }

    return (
        <TouchableOpacity style={styles.item} onPress={handleSelect}>
            <View style={styles.title}>
                <Paragraph>{title}</Paragraph>
            </View>
            <View style={styles.checkbox}>
                <Checkbox status={checked ? 'checked' : 'unchecked'} />
            </View>
        </TouchableOpacity>
    )
}

export default WeekdayCheckbox

const styles = StyleSheet.create({
    item: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    title: {
        justifyContent: "center"
    },
    checkbox: {

    }
})