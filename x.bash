#!/bin/bash

# Simple script to align folders in Finder using alternative method

echo "Aligning folders in Finder..."

osascript <<EOF
tell application "Finder"
  # Get the front Finder window
  if (count of Finder windows) > 0 then
    tell front Finder window
      # Set to icon view
      set current view to icon view
      # Try to clean up the icons
      try
        clean up
      end try
    end tell
    
    # Alternative method using System Events
    tell application "System Events"
      tell process "Finder"
        # Menu bar access for clean up commands
        try
          click menu item "Clean Up By" of menu "View" of menu bar 1
        end try
      end tell
    end tell
  else
    display dialog "No Finder windows are open." buttons {"OK"} default button 1
  end if
end tell
EOF

echo "Alignment complete!"
