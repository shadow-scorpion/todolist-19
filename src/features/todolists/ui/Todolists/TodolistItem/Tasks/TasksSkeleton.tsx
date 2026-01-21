import Skeleton from "@mui/material/Skeleton"
import Box from "@mui/material/Box"
import { containerSx } from "@/common/styles"

export const TasksSkeleton = () => {
  return (
    <Box style={{ padding: "8px 0" }}>
      {Array(4)
        .fill(null)
        .map((_, id) => {
          return (
            <Box key={id} sx={containerSx}>
              <Box key={id} sx={containerSx} style={{ gap: "15px" }}>
                <Skeleton width={20} height={20} />
                <Skeleton width={120} height={20} />
              </Box>
                <Skeleton width={20} height={20} />
            </Box>
          )
        })}
    </Box>
  )
}
