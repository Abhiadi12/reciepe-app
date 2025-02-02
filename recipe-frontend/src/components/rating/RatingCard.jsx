import React from "react";
import DeleteRecipe from "../recipe/DeleteRecipe";
import { Card, Modal } from "../common";
import { getAverageRating } from "../../utils/getAverageRating";

function RatingCard({ ratings, userId, onDelete }) {
  const [selectedRating, setSelectedRating] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  return (
    <Card className="w-full h-[320px] overflow-y-auto p-4">
      <h4 className="text-lg font-semibold">Total Ratings: {ratings.length}</h4>
      <div className="flex items-center space-x-2 mt-2">
        <h4 className="text-md font-medium">Average Rating:</h4>
        <p className="text-lg font-bold">
          {getAverageRating(ratings)}
          <span className="text-yellow-500 text-xl pl-1">{"★"}</span>
        </p>
      </div>
      <div className="mt-4 space-y-4">
        {ratings?.map((rating) => (
          <div key={rating._id} className="p-3 border rounded-lg">
            <h5 className="font-medium">
              {rating?.user?._id === userId ? "You" : rating?.user?.username}
            </h5>

            <span className="text-yellow-500 text-xl">
              {"★".repeat(rating?.score)}
            </span>
            <div className="flex">
              <p className="text-sm text-gray-600">{rating?.feedback}</p>
              {/* Delete Button */}
              {rating?.user?._id === userId && (
                <span
                  onClick={() => {
                    setSelectedRating(rating);
                    setOpen(true);
                  }}
                  className="text-red-500 hover:cursor-pointer ml-3 mt-[-2.2px]"
                >
                  delete
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        modalOpen={open}
        setModalOpen={setOpen}
        cstmStyle="w-full max-w-2xl"
      >
        {selectedRating && (
          <DeleteRecipe
            title="Are you sure"
            description="Do you want to delete this rating?"
            id={selectedRating._id}
            handleDelete={(id) => {
              onDelete(id);
              setOpen(false);
              setSelectedRating(null);
            }}
          />
        )}
      </Modal>
    </Card>
  );
}

export default RatingCard;
