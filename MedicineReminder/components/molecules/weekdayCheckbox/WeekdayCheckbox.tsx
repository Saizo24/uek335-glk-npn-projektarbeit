import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Checkbox, Paragraph } from 'react-native-paper'

type WeekdayCheckboxProps = {
    title: string,
    value: number,
    boxChecked: boolean,
    handleCheck: Function
}

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