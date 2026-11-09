Add-Type -AssemblyName System.Drawing
$image = [System.Drawing.Bitmap]::FromFile((Join-Path (Get-Location) 'public/icons/cat-functions-soft.jpg'))
$frames = @()
try {
  for ($row=0; $row -lt 6; $row++) {
    for ($col=0; $col -lt 6; $col++) {
      $left=[int][Math]::Ceiling($col*$image.Width/6)+2
      $right=[int][Math]::Floor(($col+1)*$image.Width/6)-2
      $top=[int][Math]::Ceiling($row*$image.Height/6)+2
      $bottom=[int][Math]::Floor(($row+1)*$image.Height/6)-2
      $minX=$right; $maxX=$left; $minY=$bottom; $maxY=$top
      for ($y=$top;$y -lt $bottom;$y++) {
        for ($x=$left;$x -lt $right;$x++) {
          $c=$image.GetPixel($x,$y)
          if ($c.R -lt 200 -or $c.G -lt 185 -or $c.B -lt 170) {
            $minX=[Math]::Min($minX,$x);$maxX=[Math]::Max($maxX,$x)
            $minY=[Math]::Min($minY,$y);$maxY=[Math]::Max($maxY,$y)
          }
        }
      }
      $side=[Math]::Max($maxX-$minX+1,$maxY-$minY+1)/0.78
      $size=[Math]::Round($image.Width/$side*100,4)
      $posX=[Math]::Round((($minX+$maxX)/2-$side/2)/($image.Width-$side)*100,4)
      $posY=[Math]::Round((($minY+$maxY)/2-$side/2)/($image.Height-$side)*100,4)
      $frames += "[$size, $posX, $posY]"
    }
  }
} finally { $image.Dispose() }
$output = '// Normalized atlas bounds: background size %, x %, y %. Each icon fills 78% of its slot.' + [Environment]::NewLine + 'export const iconFrames = [' + ($frames -join ',') + '] as const;' + [Environment]::NewLine
[System.IO.File]::WriteAllText((Join-Path (Get-Location) 'src/kitty/iconFrames.ts'),$output)
