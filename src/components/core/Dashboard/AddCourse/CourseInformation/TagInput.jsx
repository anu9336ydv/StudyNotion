// Importing React hook for managing component state
import { useEffect, useState } from "react"
// Importing React icon component
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

// Defining a functional component tagInput
export const TagInput=({
  // Props to be passed to the component
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
})=> {
  const { editCourse, course } = useSelector((state) => state.course)

  // Setting up state for managing tags array
  const [tags, settags] = useState([])

  useEffect(() => {
    if (editCourse) {
      // console.log(course)
      settags(course?.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, tags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  // Function to handle user input when tags are added
  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      // Prevent the default behavior of the event
      event.preventDefault()
      // Get the input value and remove any leading/trailing spaces
      const tagValue = event.target.value.trim()
      // Check if the input value exists and is not already in the tags array
      if (tagValue && !tags.includes(tagValue)) {
        // Add the tag to the array and clear the input
        const newTags = [...tags, tagValue]
        settags(newTags)
        event.target.value = ""
      }
    }
  }

  // Function to handle deletion of a tag
  const handleDeletetag = (tagIndex) => {
    // Filter the tags array to remove the tag with the given index
    const newTags = tags.filter((_, index) => index !== tagIndex)
    settags(newTags)
  }

  // Render the component
  return (
    <div className="flex flex-col space-y-2">
      {/* Render the label for the input */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      {/* Render the tags and input */}
      <div className="flex w-full flex-wrap gap-y-2">
        {/* Map over the tags array and render each tag */}
        {tags.map((tag, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {/* Render the tag value */}
            {tag}
            {/* Render the button to delete the tag */}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeletetag(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        {/* Render the input for adding new tags */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>
      {/* Render an error message if the input is required and not filled */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}