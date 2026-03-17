const Input = ({ type, placeholder, value, onChange }) => {
    return (
        <div>
            <input 
                type={type} 
                placeholder={placeholder} 
                onChange={onChange} 
                value={value} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
        </div>
    )
}

export default Input
