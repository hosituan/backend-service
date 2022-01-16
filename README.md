
# AUTH /api/v1/auth
## Resgister 
* path: /resgister
* method: POST
* body:    
    * username: String
    * password: String
    * email: String

## Login
* path: /login
* method: POST
* body:
    * username: String
    * password: String


# Feed /api/v1/feed
## Create Post
* path: /create
* method: POST
* body:
    * title: String
    * content: String
    * accessToken: String
    * groupdId: String?
    * isPublic: Bool?

## Get Post detail
* path: /detail
* method: GET
* param:
    * postId: String
    * groupdId: String?

## Get Post list
* path: /list
* method: GET
* param:
    * postId: String
    * groupdId: String?
    * limit: Int?
    * page: Int?

## Upvote
* path: /upvote
* method: POST
* body: 
    * accessToken: String
    * postId: String
    * groupId: String?

## Un-Upvote
* path: /upvote
* method: DELETE
* body: 
    * accessToken: String
    * postId: String
    * groupId: String?

## Downvote
* path: /downvote
* method: POST
* body: 
    * accessToken: String
    * postId: String
    * groupId: String?

## Un-Downvote
* path: /downvote
* method: DELETE
* body: 
    * accessToken: String
    * postId: String
    * groupId: String?