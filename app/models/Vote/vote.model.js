
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        ownerId: String,
        postId: String,
        postOwnerId: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Vote = mongoose.model("feeds", schema);
    return Post;
  };