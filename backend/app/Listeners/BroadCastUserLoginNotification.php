<?php

namespace App\Listeners;

use App\Events\UserSessionChanged;
use Illuminate\Auth\Event\Login;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class BroadCastUserLoginNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserSessionChanged $event): void
    {
        broadcast(new UserSessionChanged('User loglin', 'info'));
    }
}
