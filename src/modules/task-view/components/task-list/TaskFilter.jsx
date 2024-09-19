import PropTypes from 'prop-types';

const filters = ['ALL', 'HIGH', 'MEDIUM', 'LOW', 'DONE'];

const TaskFilter = ({ appliedFilter, handleAppliedFilter }) => {
    return (
        <>
            <div className="flex space-x-2 mt-4">
                {filters.map((filter, index) => (
                    <button
                        key={index}
                        onClick={() => handleAppliedFilter(filter)}
                        className={`min-w-5 sm:min-w-16 py-2 px-3 rounded-t-md rounded-b-none text-xs sm:text-sm  capitalize transition duration-300 ${appliedFilter === filter ? 'bg-white text-black hover:bg-white' : 'text-white bg-teal-800 hover:bg-teal-900'}`}
                    >
                        {filter.toLowerCase()}
                    </button>
                ))}
            </div>
        </>
    )
}

TaskFilter.propTypes = {
    appliedFilter: PropTypes.string.isRequired,
    handleAppliedFilter: PropTypes.func.isRequired
};

export default TaskFilter;