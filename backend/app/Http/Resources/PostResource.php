<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'img_url' => $this->img_url,
            'video' => $this->video,
            'content' => $this->content,
            'type' => $this->type,
            'created_at'  => $this->created_at->diffForHumans(),
            'page' => new PageResource($this->page),
            'comments' => CommentResource::collection($this->comments),
            'like' => LikeResource::collection($this->likes),
            'user' => new UserResource($this->user),
        ];
    }
}
