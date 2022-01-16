module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        content: String,
        ownerId: String,
        groupId: String,
        isPublic: Boolean,
        upvoteCount: Number,
        downvoteCount: Number,
        upvotedUserId: [],
        downvotedUserId: []
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Post = mongoose.model("feeds", schema);
    return Post
  };