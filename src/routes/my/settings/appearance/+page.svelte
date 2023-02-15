<div class="flex flex-col w-full h-full space-y-12">
    <div class="w-full">
        <h3 class="text-2xl font-medium">Change Theme</h3>
        <div class="divider"></div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1 z-50">
                <li>
                    <button> Set Theme 🎨 </button>
                    <ul class="p-2 bg-base-100 w-full max-h-96 overflow-y-scroll">
                        <form method="POST">
                            <li>
                                <button formaction="?/setTheme&theme=light">Light</button>
                            </li>
                            <li>
                                <button formaction="?/setTheme&theme=dark">Dark</button>
                            </li>
                        </form>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>