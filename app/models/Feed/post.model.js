module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        content: String,
        ownerId: String,
        groupId: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Post = mongoose.model("feeds", schema);
    return Post;
  };