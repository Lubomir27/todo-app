import { Tab, Tabs } from '@mui/material'
import { TodoFilterValues } from '../../common/types'

interface SelectTabsProps {
    onFilterChange: (newValue: TodoFilterValues) => void
    selectedFilter: TodoFilterValues
}

const SelectTabs = ({ onFilterChange, selectedFilter }: SelectTabsProps) => {
    return (
        <Tabs
            value={selectedFilter}
            onChange={(e, newValue: TodoFilterValues) => onFilterChange(newValue)}
            centered>
            <Tab
                label="Všetky"
                value="ALL"
            />
            <Tab
                label="Aktívne"
                value="ACTIVE"
            />
            <Tab
                label="Dokončené"
                value="FINISHED"
            />
        </Tabs>
    )
}

export default SelectTabs
