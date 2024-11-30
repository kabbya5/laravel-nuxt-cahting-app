<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['sender_id', 'receiver_id', 'group_id', 'content', 'message_type'];

    // Sender of the message
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // Receiver of the message (null for group messages)
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    // Group the message belongs to
    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
